import assetsmanagement_icon from "../../../assets/sidebaricons/assetsmanagement_icon.svg";
import dashboard_icon from "../../../assets/sidebaricons/dashboard_icon.svg";
import cctv_icon from "../../../assets/sidebaricons/cctv_icon.svg";
import employee_icon from "../../../assets/sidebaricons/employee_icon.svg";
import fleet_icon from "../../../assets/sidebaricons/fleet_icon.svg";
import hrms_icon from "../../../assets/sidebaricons/hrms_icon.svg";
import master_icon from "../../../assets/sidebaricons/master_icon.svg";
import paymentservice_icon from "../../../assets/sidebaricons/paymentservice_icon.svg";
import questiobank_icon from "../../../assets/sidebaricons/questionbank_icon.svg";
import sms_icon from "../../../assets/sidebaricons/sms_icon.svg";
import student_icon from "../../../assets/sidebaricons/student_icon.svg";
import warehouse_icon from "../../../assets/sidebaricons/warehouse_icon.svg";
import application_icon from "../../../assets/sidebaricons/application_icon.svg";

export const listData = [
  { icon: dashboard_icon, name: "Dashboard", route: "/dashboard" },
  { icon: student_icon, name: "Student", route: "/students" },
  { icon: application_icon, name: "Application", route: "/application" },
  { icon: employee_icon, name: "Employee", route: "/employee" },
  { icon: fleet_icon, name: "Fleet", route: "/fleet" },
  { icon: warehouse_icon, name: "Warehouse", route: "/warehouse" },
  { icon: sms_icon, name: "SMS", route: "/sms" },
  { icon: questiobank_icon, name: "Question Bank", route: "/question-bank" },
  {
    icon: assetsmanagement_icon,
    name: "Assets Management",
    route: "/assets-management",
  },
  {
    icon: paymentservice_icon,
    name: "Payment Service",
    route: "/payments-service",
  },
  { icon: cctv_icon, name: "CCTV", route: "/cctv" },
  { icon: hrms_icon, name: "HRMS", route: "/hrms" },
  { icon: master_icon, name: "Masters", route: "/masters" },
];
