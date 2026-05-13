import { useState, useEffect } from 'react'
import './App.css'

const API_URL =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
const PAGE_SIZE = 10

// 接收 keyword 與 onChange，向上回傳使用者輸入
function SearchInput({ keyword, onChange }) {
  return (
    <input
      type="text"
      value={keyword}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

// 接收當頁資料，純展示元件
function DataTable({ pageData }) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>名稱</th>
          <th>地點</th>
          <th>票價</th>
        </tr>
      </thead>
      <tbody>
        {pageData.map((data, index) => {
          const showInfo = (data.showInfo && data.showInfo[0]) || {}
          return (
            <tr key={index}>
              <td>{data.title || ''}</td>
              <td>{showInfo.location || ''}</td>
              <td>{showInfo.price || ''}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// 接收分頁狀態與回呼，控制上一頁/下一頁
function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div>
      <button onClick={onPrev} disabled={currentPage === 1}>
        上一頁
      </button>
      <span style={{ margin: '0 8px' }}>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        下一頁
      </button>
    </div>
  )
}

// App 統一管理 state，透過 props 向下傳遞給子元件
function App() {
  const [dataset, setDataset] = useState([])
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', API_URL, true)
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        setDataset(JSON.parse(this.responseText))
      }
    }
    xhr.send()
  }, [])

  // 篩選與分頁均由 state 衍生，不需要額外 state 儲存
  const filteredDataset = dataset.filter((data) =>
    (data.title || '').toLowerCase().includes(keyword.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filteredDataset.length / PAGE_SIZE))
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pageData = filteredDataset.slice(startIndex, startIndex + PAGE_SIZE)

  function handleKeywordChange(value) {
    setKeyword(value)
    setCurrentPage(1) // 搜尋後回到第一頁
  }

  return (
    <div className="container py-3">
      <h1>
        景點觀光展覽資訊{' '}
        <SearchInput keyword={keyword} onChange={handleKeywordChange} />
      </h1>
      <DataTable pageData={pageData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
      />
    </div>
  )
}

export default App
