import Cookies from 'universal-cookie';

const cookies = new Cookies();
// 로그인 시 쿠키 등록
export function setRefreshTokenToCookie(refreshToken) {
  cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });
}

// 로그아웃 시 쿠키 제거
export function logoutCookie() {
  cookies.remove('refreshToken');
}

// 쿠키 가져오기(통신에만 사용, 유저 로그인 여부는 Redux-user에서 확인)
// undefined일때 쿠키가 없는 것이므로 오류로 처리
export function getAccessCookie() {
  const refreshToken = cookies.get('refreshToken');
  if (refreshToken) {
    return {
      refreshToken,
    };
  }
  return undefined;
}
