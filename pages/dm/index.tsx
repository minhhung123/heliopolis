import type { NextPage } from 'next'
import { Default } from 'components/layouts/Default';
import {Chat} from 'components/templates/dm'
const BlankConversation: NextPage = () => {
    
    return(
        <div/>
    )
  
}
BlankConversation.PageLayout =  Chat
export default BlankConversation
