import { Route, Routes } from "react-router-dom";
import { Home, HomePage, Login, RentalApartment, RentalHouse, RentalRoom, RentalSapce } from "./containers/Public";
import { path } from "./ultils/constant";

function App() {
  return (
    <div className="h-screen w-screen bg-primary ">
      <Routes >
        <Route path={path.HOME} element={<Home />} >
          <Route path='*' element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalSapce />} />
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
