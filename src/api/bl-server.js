import request from '@/utils/request'

export function getComments(type) {
    return request({
        url: `/comments/get-by-type/${type}`,
        method: 'get',
    })
}
