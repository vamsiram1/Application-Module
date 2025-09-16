// import { FormControl, MenuItem, Select } from "@mui/material";
// import styles from "./ZoneNameDropdown.module.css";
// import downArrow from "../../../../assets/application-analytics/down_arrow.png";

// const myArrow = () => {
//   return (
//     <figure>
//       <img className={styles.down_arrow} src={downArrow} />
//     </figure>
//   );
// };
// const ZoneNameDropdown = () => {
//   const zones = [
//     {
//       id: 1,
//       zoneName: "zone1",
//     },
//     {
//       id: 2,
//       zoneName: "zone2",
//     },
//     {
//       id: 3,
//       zoneName: "zone3",
//     },
//     {
//       id: 4,
//       zoneName: "zone4",
//     },
//   ];

//   return (
//     <div id="zone_name_dropddown">
//       <label className={styles.dropdow_label_text}>Zone Name</label>
//       <FormControl fullWidth>
//         <Select
//           displayEmpty
//           IconComponent={myArrow}
//           sx={{
//             marginTop: 0.5,
//             borderRadius: 2,
//             height: 40,
//             fontSize: 14,

//             "& .MuiSelect-select": {
//               padding: "8px 14px",
//             },

//             "& .MuiSelect-root .MuiInputBase-root .MuiInputBase-colorPrimary":{
//               display:"none",
//             },
//           }}
//           MenuProps={{
//             PaperProps: {
//               onMouseDown: (e) => e.stopPropagation(),
//             },
//           }}
//         >
//           <MenuItem disabled>
//             Select Zone
//           </MenuItem>

//           {zones.map((zone) => {
//             return (
//               <MenuItem value={zone.zoneName} key={zone.id}>
//                 {zone.zoneName}
//               </MenuItem>
//             );
//           })}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default ZoneNameDropdown;

import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import downArrow from "../../../../assets/application-analytics/down_arrow.png";
import styles from "./ZoneNameDropdown.module.css";

const ZoneNameDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");

  const zones = [
    { id: 1, zoneName: "zone1" },
    { id: 2, zoneName: "zone2" },
    { id: 3, zoneName: "zone3" },
    { id: 4, zoneName: "zone4" },
  ];

  const handleToggle = (event) => {
    event.stopPropagation(); 
    setOpen((prev) => !prev);
  };

  const handleChange = (event) => {
    setSelectedZone(event.target.value);
  };

  return (
    <div id="zone_name_dropdown">
      <label className={styles.dropdow_label_text}>Zone Name</label>
      <FormControl fullWidth>
        <Select
          value={selectedZone}
          onChange={handleChange}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          displayEmpty
          IconComponent={() => (
            <figure
              onClick={handleToggle}
              className={styles.fig}
            >
              <img className={styles.down_arrow} src={downArrow} alt="toggle" />
            </figure>
          )}
          sx={{
            marginTop: 0.5,
            borderRadius: 2,
            height: 40,
            fontSize: 14,
            "& .MuiSelect-select": {
              padding: "8px 14px",
            },
          }}
          MenuProps={{
            PaperProps: {
              onMouseDown: (e) => e.stopPropagation(),
            },
          }}
        >
          <MenuItem disabled value="">
            Select Zone
          </MenuItem>
          {zones.map((zone) => (
            <MenuItem value={zone.zoneName} key={zone.id}>
              {zone.zoneName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ZoneNameDropdown;
