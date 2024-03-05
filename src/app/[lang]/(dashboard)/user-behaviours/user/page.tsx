import React from 'react'

import { userList } from '@/data/fake-db/userList'
import UserList from '@views/user-behaviours/user'

export default async function Page() {
  const data = await getUserList()

  
return <UserList userData={data} />
}

const getUserList = React.cache(() => {
  return Promise.resolve(userList.slice())
})
