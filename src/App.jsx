import { Route, Routes } from "react-router-dom";
import { Contact, DetailPost, Home, HomePage, Login, Rental, SearchDetail } from "./containers/Public";
import { path } from "./ultils/constant";
import System from "./containers/System/System";
import CreatePost from "./containers/System/CreatePost";
import * as actions from './store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import ManagePost from "./containers/System/ManagePost";
import EditAccount from "./containers/System/EditAccount";


function App() {

  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [])

  return (
    <div className="bg-primary overflow-hidden">
      <Routes >
        <Route path={path.HOME} element={<Home />} >
          <Route path='*' element={<HomePage />} />
          <Route path={path.HOME__PAGE} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={'chi-tiet/*'} element={<DetailPost />} />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
