import { useLocale } from '../$locale'
import { AppLink } from '~/components'

export default function Index() {
  const locale = useLocale()
  return (
    <p>
      Index; locale is {locale};
      <AppLink to="/about">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
          Go to About
        </button>
      </AppLink>
    </p>
  )
}
