import { DOMAIN_URL } from 'constants/index'

const DEFAULT_IMAGE =
  'https://app.banklessacademy.com/images/default_avatar.png'

const DEFAULT_NAME = 'explorer.eth'

const DEFAULT_SCORE = 'XX'

const Skill = ({ skill, score, max }) => (
  <div
    style={{
      display: 'flex',
      opacity: '0.5',
      marginTop: '40px',
      width: '100%',
      height: '40px',
      justifyContent: 'flex-end',
      position: 'relative',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '20px',
        height: '40px',
      }}
    >
      {score}
    </div>
    <div
      style={{
        display: 'flex',
        width: `${(score / max) * 230 + 200}px`,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '40px',
        backgroundColor: '#A379BD',
        borderBottomLeftRadius: '2px',
        borderTopLeftRadius: '2px',
        textTransform: 'uppercase',
        paddingRight: '20px',
      }}
    >
      {skill}
    </div>
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: '-5px',
        height: '50px',
        right: '198px',
        borderRight: '1px #989898 solid',
      }}
    />
  </div>
)

const Skills = ({ stats }) => (
  <div
    style={{
      display: 'flex',
      position: 'relative',
      width: '550px',
      height: '258px',
      marginTop: '4px',
      flexWrap: 'wrap',
    }}
  >
    <Skill skill="Badges" score={stats?.badges || 0} max={9} />
    <Skill
      skill="Collectibles"
      score={stats?.collectibles + stats?.handbooks || 0}
      max={8}
    />
    <Skill
      skill="Donations"
      score={stats?.donations ? Object.keys(stats?.donations)?.length || 0 : 0}
      max={9}
    />
  </div>
)

const OgSocial = ({
  explorerName,
  explorerAvatar,
  score,
  stats,
  badgeImageLink,
}: // type,
{
  explorerName?: string
  explorerAvatar?: string
  score?: string | number
  stats?: {
    badges?: number
    collectibles?: number
    handbooks?: number
    donations?: any
  }
  badgeImageLink?: string
  // type?: 'profile' | 'badge'
}): React.ReactElement => {
  const profileSocialBackground = `${DOMAIN_URL}/images/profileSocialBackground.png?f=1`
  const badgeSocialBackground = `${DOMAIN_URL}/images/badgeSocialBackground.png?f=1`

  return (
    <>
      <img
        style={{
          display: 'flex',
          position: 'absolute',
          width: '1200px',
          height: '628px',
        }}
        src={badgeImageLink ? badgeSocialBackground : profileSocialBackground}
      />
      <img
        style={{
          display: 'flex',
          position: 'absolute',
          top: '93px',
          left: '97px',
          width: '312px',
          height: '312px',
          borderRadius: '50%',
        }}
        src={explorerAvatar || DEFAULT_IMAGE}
      />
      {!badgeImageLink && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '168px',
            left: '1012px',
            width: '102px',
            height: '63px',
            fontSize: 63,
            fontFamily: '"ClearSans"',
            color: '#EAD6FF',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {score || DEFAULT_SCORE}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '432px',
          left: '32px',
          width: '433px',
          height: '119px',
          fontSize: 40,
          fontFamily: '"ClearSans"',
          color: '#EAD6FF',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'uppercase',
        }}
      >
        {explorerName || DEFAULT_NAME}
      </div>
      {badgeImageLink ? (
        <img
          style={{
            display: 'flex',
            position: 'absolute',
            top: '80px',
            left: '691px',
            width: '345px',
            height: '345px',
            borderRadius: '50%',
          }}
          src={badgeImageLink}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '276px',
            left: '568px',
            width: '550px',
            height: '258px',
            fontSize: 20,
            fontFamily: '"ClearSans"',
            color: 'white',
          }}
        >
          <Skills stats={stats} />
        </div>
      )}
    </>
  )
}

export default OgSocial