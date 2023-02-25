/* eslint-disable no-console */
import React from 'react'
import { Container, Button, Box, useToast } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useAccount, useNetwork } from 'wagmi'
import { switchNetwork, signTypedData } from '@wagmi/core'

import { MetaData } from 'components/Head'
import { LESSONS } from 'constants/index'
import { MINTKUDOS_CHAIN_ID, MINTKUDOS_DOMAIN_INFO } from 'constants/kudos'
import { NETWORKS } from 'constants/networks'
import { api } from 'utils'

const pageMeta: MetaData = {
  title: 'Kudos',
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { pageMeta },
  }
}

const Kudos = (): JSX.Element => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const toast = useToast()

  const signMessage = async (kudosId: number) => {
    const adminTypes = {
      CommunityAdminAirdrop: [{ name: 'tokenId', type: 'uint256' }],
    }

    // The data to sign
    const value = {
      tokenId: kudosId,
    }

    if (chain?.id !== MINTKUDOS_CHAIN_ID) {
      const network = Object.values(NETWORKS).find(
        (network) => network.chainId === MINTKUDOS_CHAIN_ID
      )
      toast.closeAll()
      toast({
        title: 'Wrong network',
        description: `switch network to ${network.name}`,
        status: 'warning',
        duration: null,
      })
      await switchNetwork({ chainId: MINTKUDOS_CHAIN_ID })
    }
    try {
      const signature = await signTypedData({
        domain: MINTKUDOS_DOMAIN_INFO,
        types: adminTypes,
        value,
      })
      // console.log('signature', signature)
      toast.closeAll()
      const bodyParameters = {
        address,
        kudosId,
        signature,
      }
      console.log(bodyParameters)
      const result = await api('/api/sign-kudos', bodyParameters)
      console.log(result.data)
      if (result && result.status === 200) {
        if (result.data?.error) {
          toast({
            title: `Signature for ${kudosId}`,
            description: result.data?.error,
            status: 'error',
            duration: 10000,
          })
        } else {
          toast({
            title: `Signature for ${kudosId}`,
            description: result.data?.result,
            status: 'success',
            duration: 10000,
          })
        }
      } else {
        // TODO: handle errors
      }
    } catch (error) {
      // TODO: add error feedback
      console.error(error)
    }
  }

  return (
    <Container maxW="container.xl">
      {LESSONS.map((lesson, index) => (
        <Box key={index}>
          {/* TODO: show if already signed in UI */}
          {lesson.kudosId && (
            <Button
              onClick={() => signMessage(lesson.kudosId)}
              variant="primary"
            >
              sign {lesson.kudosId}
            </Button>
          )}
        </Box>
      ))}
    </Container>
  )
}

export default Kudos
