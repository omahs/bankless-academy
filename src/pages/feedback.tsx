import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { PageMetaProps } from 'components/Head'

const pageMeta: PageMetaProps = {
  title: 'Feedback',
  description: '...',
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { pageMeta },
  }
}

const Feedback = (): JSX.Element => {
  return (
    <Container maxW="container.lg">
      <Box
        w="100%"
        height="2300px"
        borderRadius="12px"
        padding="4"
        backgroundColor="white"
      >
        <iframe
          src="https://tally.so/embed/wvy7A3?hideTitle=0&alignLeft=1"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </Box>
    </Container>
  )
}

export default Feedback