import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Home = React.lazy(() => import('./pages/Home'))
const Post = React.lazy(() => import('./pages/Post'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />}>
          </Route>
          <Route path='/home' element={<Home />}>
          </Route>
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
