import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref, toValue, watchEffect, type MaybeRef } from 'vue'
import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common'
import { QUERY_KEY } from '~/constants/key'

export const useGetCategoryIcons = (search: MaybeRef<string>, size = 14) => {
  const icons = ref<string[]>([])

  const { data } = useQuery({
    queryKey: [QUERY_KEY.CATEGORY_ICON],
    queryFn: () => axios.get(`${ICONIFY_API_URI}/collection?prefix=${CATEGORY_ICON_PREFIX}`).then((res) => res.data)
  })

  watchEffect(() => {
    if (!data.value) return

    let iconData = Object.values(data.value.categories).flatMap((iconList) => iconList) as string[]

    const keyword = toValue(search)
    if (keyword) {
      iconData = iconData.filter((icon) => icon.includes(keyword))
    }

    icons.value = iconData.slice(0, size).map((icon) => `${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`)
  })

  return icons
}
