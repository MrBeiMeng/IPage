import request from '@/utils/request'

export function getComments(type) {
    return request({
        url: `/comments/get-by-type/${type}`,
        method: 'get',
    })
}

export function getJobStatus() {
    return request({
        url: `/job-status/get-all`,
        method: 'get',
    })
}

export function getResumes() {
    return request({
        url: `/resume/get-all`,
        method: 'get',
    })
}

export function addResumes(resume) {
    return request({
        url: `/resume/add`,
        method: 'post',
        data:resume
    })
}