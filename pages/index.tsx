import { supabase } from '../utils/supabase'
import Link from 'next/link'
import type { GetStaticProps, NextPage } from 'next'
import type { ReactNode } from 'react'

export type Lesson = {
  id: number
  created_at: string
  title: string
  description: string
}

type Props = {
  children?: ReactNode
  lessons: Lesson[]
}

const Home: NextPage<Props> = ({ lessons }) => {
  console.log(supabase.auth.user())
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data: lessons } = await supabase.from('lesson').select('*')

  return {
    props: {
      lessons,
    },
  }
}
