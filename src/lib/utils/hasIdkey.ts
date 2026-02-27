/** obj ( 객체 )에 key 로 전달한 키값이 있는지 판별하는 함수 */
export function hasIdKey(obj: any, key: string) {
  if (obj && obj.hasOwnProperty(key)) {
    return true;
  }
  return false;
}
