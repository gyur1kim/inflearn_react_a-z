import Head from 'next/head'
import { Inter } from '@next/font/google'
import homeStyles from '../styles/Home.module.css'
import {GetStaticProps} from "next";
import {getSortedPostsData, PostDataType} from "../lib/post";

const inter = Inter({ subsets: ['latin'] })

// const Home: NextPage = () => {} 라고 쓸 수도 있음
/**
 * 1. Home이라는 상수를 선언
 * 2. NextPage는, Next.js에서 제공하는 Typescript의 타입이다.
 *    Next.js 페이지 컴포넌트의 타입이다.
 * 3.즉 Home이라는 컴포넌트를 생성하는데, 이 컴포넌트의 타입이 NextPage인 것이다.
 */

export default function Home({allPostsData}: {
  allPostsData: PostDataType[]
}) {
  return (
    <div>
      {/*이 부분은 html의 head 부분에 해당된다*/}
      <Head>
        <title>gyur1kim</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={homeStyles.headingMd}>
        <p>[안녕하세요 김규리입니다]</p>
        <p>
          (This is a website)
        </p>
      </section>

      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({id, title, date}) =>
            <li key={`post_data_${id}`} className={homeStyles.listItem}>
              <a>{title}</a>
              <br/>
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

//getStaticProps 함수를 async로 export하면, getStaticProps에서 리턴되는 props를 가지고 페이지를 pre-render한다
export const getStaticProps: GetStaticProps = async() => {
  const allPostsData = getSortedPostsData();
  return {
    props: {allPostsData}
  }
}