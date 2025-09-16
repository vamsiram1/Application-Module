import AccordiansContainer from "../../application-analytics-containers/accordians-container/AccordiansContainer";
import AnalyticsHeaderContainer from "../analytics-header-container/AnalyticsHeaderContainer";
import ZoneRateContainer from "../zone-rate-container/ZoneRateContainer";
import styles from "./AnalyticsWholeContainer.module.css";

import headerIon from "../../../assets/application-analytics/accordians_header.png";
import MetricCards from "../../../components/application-analytics/metric-cards-component/metric-cards/MetricCards";
const AnalyticsWholeContainer = () => {
  return (
    <>
      <div className={styles.analytics_section}>
        <AnalyticsHeaderContainer />
        <MetricCards />
        <ZoneRateContainer />
      </div>

      <div className={styles.prev_years_graphs_section}>
        <div className={styles.accordian_header_text}>
          <figure>
            <img src={headerIon} className={styles.icon} />
          </figure>
          <h6 className={styles.header_text}>Previous Year Graph</h6>
        </div>
        <AccordiansContainer />
      </div>
    </>
  );
};

export default AnalyticsWholeContainer;
