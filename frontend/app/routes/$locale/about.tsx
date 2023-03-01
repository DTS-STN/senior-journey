import { useLocale } from '../$locale';

export default function About() {
  const locale = useLocale();
  return <p>About; locale is {locale}</p>

}
