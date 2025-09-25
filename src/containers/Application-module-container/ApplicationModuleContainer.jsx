import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./ApplicationModuleContainer.module.css";
import AnalyticsWholeContainer from "../application-analytics-containers/analytics-whole-container/AnalyticsWholeContainer";
import ApplicationSearchContainer from "../application-analytics-containers/application-search-container/ApplicationSearchContainer";
import ApplicationNavLinksContainer from "../application-analytics-containers/application-nav-links-container/ApplicationNavLinksContainer";
import DistributeTab from "../../components/application-distribution/DistributeTab";
import ApplicationStatus from "../../components/application-status/ApplicationComponent/ApplicationStatus/ApplicationStatus";
import ApplicationStatusForm from "../../components/application-status/ApplicationComponent/ApplicationStatusForm/AppplicationStatusForm";

const ApplicationModuleContainer = () => {
  const location = useLocation();
  const isDistribute = location.pathname.includes("/distribute");
  const isStatus = location.pathname.includes("/status");

  return (
    <div className={styles.main_content}>
      {/* Hide search when in distribute or status */}
      {!isDistribute && !isStatus && <ApplicationSearchContainer />}

      <ApplicationNavLinksContainer />

      <div
        id="analytics_wrapper"
        className={`${styles.analytics_wrapper} ${
          isDistribute ? styles.column : styles.row
        }`}
      >
        <Routes>
          {/* Default redirect → /analytics */}
          
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AnalyticsWholeContainer />} />
          <Route path="distribute/*" element={<DistributeTab />} />
          <Route path="status" element={<ApplicationStatus />} />
          <Route
            path="status/:applicationNo/:status?"
            element={<ApplicationStatusForm />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ApplicationModuleContainer;
