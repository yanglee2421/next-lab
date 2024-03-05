import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useQueryClient } from '@tanstack/react-query'

import { get_company } from '@/api/api-erp'

export function useEditForm() {
  const queryClient = useQueryClient()

  return useForm<FormValues>({
    async defaultValues() {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: ['get_company'],
          queryFn: get_company
        })

        return {
          email: data.email || '',
          name: data.name || '',
          street: data.street || '',
          street2: data.street2 || '',
          city: data.city || '',
          state_id: data.state_id || null,
          country_id: data.country_id || null,
          zip: data.zip || '',
          vat: data.vat || '',
          website: data.website || '',
          phone: data.phone || '',
          mobile: data.mobile || '',
          lang: data.lang || '',
          image_1920: data.image_1920 || ''
        }
      } catch (error) {
        console.error(error)

        return {
          email: '',
          name: '',
          street: '',
          street2: '',
          city: '',
          state_id: null,
          country_id: null,
          zip: '',
          vat: '',
          website: '',
          phone: '',
          mobile: '',
          lang: '',
          image_1920: ''
        }
      }
    },

    resolver: zodResolver(schema)
  })
}

const schema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  name: z.string().min(1).max(256),
  street: z.string().min(1).max(256).nullable(),
  street2: z.string().min(1).max(256).nullable(),
  city: z.string().min(1).max(256).nullable(),
  state_id: z.number().nullable(),
  country_id: z.number().nullable(),
  zip: z.string().min(1).max(256).nullable(),
  vat: z.string().min(1).max(256).nullable(),
  website: z.string().url().nullable(),
  phone: z.string().min(1).max(256).nullable(),
  mobile: z.string().min(1).max(256).nullable(),
  lang: z.string().min(1).max(256).nullable(),
  image_1920: z.string().min(1).nullable()
})

type FormValues = z.infer<typeof schema>
