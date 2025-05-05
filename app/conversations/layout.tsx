import getConversations from "../actions/getConversations";
import getUser from "../actions/getUser";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function conversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users  = await getUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users ?? []}/>
        {children}
      </div>
    </Sidebar>
  );
}
