import React, { useContext } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Conversation } from 'components/chat/Conversation'
import { checkPath } from 'components/helpers'
import XmtpContext from 'components/contexts/xmtp'
import { WalletContext } from 'components/contexts/wallet'
import { Chat } from 'components/templates/chat'

const ConversationPage: NextPage = () => {
  const router = useRouter()
  const { client } = useContext(XmtpContext)
  const { resolveName } = useContext(WalletContext)
  const recipientWalletAddr = router.query.recipientWalletAddr as string
  const [canMessageAddr, setCanMessageAddr] = useState<boolean | undefined>(
    false
  )

  const redirectToHome = async () => {
    if (checkPath()) {
      let queryAddress = window.location.pathname.replace('/chat/dm/', '')
      if (queryAddress.includes('.eth')) {
        queryAddress = (await resolveName(queryAddress)) ?? ''
      }
      if (!queryAddress) {
        setCanMessageAddr(false)
        router.push('/chat')
      } else {
        const canMessage = await client?.canMessage(queryAddress)
        if (!canMessage) {
          setCanMessageAddr(false)
          router.push('/chat')
        } else {
          setCanMessageAddr(true)
          router.push(`/chat/dm/${queryAddress}`)
        }
      }
    }
  }

  useEffect(() => {
    redirectToHome()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!canMessageAddr || !client) {
    return (
      <Chat>
        <div />
      </Chat>
    )
  } 

  return (
    <Chat>
      <Conversation recipientWalletAddr={recipientWalletAddr} />
    </Chat>
  )
}


export default React.memo(ConversationPage)
