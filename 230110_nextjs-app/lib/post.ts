import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostDataType = {
  id: string,
  date: string,
  title: string
}
const postsDirectory = path.join(process.cwd(), 'posts');
// process.cwd()의 값
// C:\Users\SSAFY\Desktop\inflearn-react\230110_nextjs-app\

export function getSortedPostsData() {
  // posts 파일 이름 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);
  // 결과 : [pre-rendering.md, ssg-ssr.md]

  const allPostsData: PostDataType[] = fileNames.map((fileName) => {
    // 파일 이름을 id로 이용하기
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    // gray-matter 라이브러리를 이용하면, md파일을 객체로 convert
    /**
     * =====  md file  =====
     * ---
     * title: hello
     * slug: home
     * ---
     * <h1>Hello</h1>
     *
     * =====  convert  =====
     * {
     *   content: '<h1>Hello</h1>'
     *   data: {
     *     title: 'hello',
     *     slug: 'home'
     *   }
     * }
     */
    const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

    return {
      id,
      ...matterResult.data as { date: string; title: string }
    }
  })

  // 추출한 posts를 날짜별로 sort하고 return
  return allPostsData.sort((a: PostDataType, b: PostDataType) => {
    if (a.date < b.date) return 1
    else return -1
  })
}