import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts');
// process.cwd()의 값
// C:\Users\SSAFY\Desktop\inflearn-react\230110_nextjs-app

export function getSortedPostsData() {
  // posts 파일 이름 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);
  // 결과 : [pre-rendering.md, ssg-ssr.md]

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...allPostsData(matterResult.data as { date: string; title: string })
    }
  })

  // 추출한 posts를 날짜별로 sort하고 return
  return allPostsData.sort((a, b) => {
    if (a.data < b.data) return 1
    else return -1
  })
}