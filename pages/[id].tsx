import { supabase } from '../utils/supabase'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Lesson } from '.'
import type { ParsedUrlQuery } from 'querystring'

type Props = {
  lesson: Lesson
}

interface IParams extends ParsedUrlQuery {
  id: string
}

const LessonDetails: NextPage<Props> = ({ lesson }) => {
  console.log({ lesson })
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  )
}

export default LessonDetails

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: lessons } = await supabase.from('lesson').select('id')

  if (!lessons) return { paths: [], fallback: false }

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const { data: lesson } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single()

  return {
    props: {
      lesson,
    },
  }
}
