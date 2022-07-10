import httpRequest from '@/axios/index'

interface UserInfoParam {
  userId: string,
  userName: string
}

export function getUserInfo (param: UserInfoParam) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return httpRequest({
    url: '',
    method: 'post',
    data: param
  })
}
