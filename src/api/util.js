import request from '@/utils/request'

export function downloadFile(url, param, fileName) {
  const defaultFileName = `默认下载文件.xlsx` // 未指定名称时的默认名称
  return request({
    url: url,
    method: 'post',
    data: param,
    responseType: 'arraybuffer'
  })
    .then(response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers['content-type'] })
      )
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute(
        'download',
        decodeURIComponent(fileName || param.fileName || defaultFileName)
      ) // 获取并设置下载文件名
      document.body.appendChild(link)
      link.click()
    })
    .catch(error => {
      console.log(error)
    })
}
