import { useMutation } from '@tanstack/react-query'

export function useUploadPost() {
  return useMutation<string, Error, Blob>({
    mutationFn(req) {
      return toDataURL(req)
    }
  })
}

function toDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(blob)

    reader.onload = evt => {
      const data = evt.target?.result

      if (!data) {
        return reject(new Error('Invalid File'))
      }

      return resolve(String(data))
    }

    reader.onerror = evt => {
      reject(evt.target?.error)
    }
  })
}
