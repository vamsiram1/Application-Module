import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Inputbox from "../../../../widgets/Inputbox/InputBox";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import Button from "../../../../widgets/Button/Button";
import { ReactComponent as TrendingUpIcon } from "../../../../assets/application-status/Trending up.svg";
import styles from "./StudentInformation.module.css";
import StudentInfoHeader from "./StudentInfoHeader";
import * as apiService from "../../../../queries/application-status/ConfirmationApis";
import { useLocation } from "react-router-dom";


// Component to handle fetching student details
const FetchStudentDetails = ({ admissionNo, setFetchError }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (admissionNo) {
        try {
          const data = await apiService.getStudentDetailsByAdmissionNo(admissionNo);
          console.log("Student details fetched:", data);
          setFieldValue("studentName", data.studentName || "");
          setFieldValue("surname", data.surname || "");
          // Determine parentName and relation based on availability
          const fatherName = data.fathername || "";
          const motherName = data.mothername || "";
          const parentName = fatherName || motherName || "";
          const parentRelationId = fatherName ? 1 : motherName ? 2 : 0;
          setFieldValue("fatherName", fatherName);
          setFieldValue("motherName", motherName);
          setFieldValue("parentName", parentName);
          setFieldValue("parentRelationId", parentRelationId);
          setFieldValue("gender", data.gender || "Male");
          setFieldValue("applicationFee", data.applicationFee || "");
          setFieldValue("initialAmount", data.confirmationAmount || "");
          setFieldValue("firstYearConcession", data.concessionAmounts?.[0] || "");
          setFieldValue("secondYearConcession", data.concessionAmounts?.[1] || "");
          setFieldValue("thirdYearConcession", data.concessionAmounts?.[2] || "");
          setFieldValue("minInitialAmount", data.confirmationAmount || 0);
          setFieldValue("reasonForConcession", data.reason || "");
          setFieldValue("reasonId", data.reasonId || "");
          setFetchError(false);
        } catch (err) {
          console.error("Failed to fetch student details for admissionNo:", admissionNo, err);
          setFieldValue("studentName", "");
          setFieldValue("surname", "");
          setFieldValue("parentName", "");
          setFieldValue("fatherName", "");
          setFieldValue("motherName", "");
          setFieldValue("parentRelationId", 0);
          setFieldValue("gender", "Male");
          setFieldValue("applicationFee", "");
          setFieldValue("initialAmount", "");
          setFieldValue("firstYearConcession", "");
          setFieldValue("secondYearConcession", "");
          setFieldValue("thirdYearConcession", "");
          setFieldValue("minInitialAmount", 5000);
          setFieldValue("reasonForConcession", "");
          setFieldValue("reasonId", "");
          setFetchError(true);
        }
      } else {
        console.warn("No admissionNo provided for fetching student details");
        setFieldValue("studentName", "");
        setFieldValue("surname", "");
        setFieldValue("parentName", "");
        setFieldValue("fatherName", "");
        setFieldValue("motherName", "");
        setFieldValue("parentRelationId", 0);
        setFieldValue("gender", "Male");
        setFieldValue("applicationFee", "");
        setFieldValue("initialAmount", "");
        setFieldValue("firstYearConcession", "");
        setFieldValue("secondYearConcession", "");
        setFieldValue("thirdYearConcession", "");
        setFieldValue("minInitialAmount", 0);
        setFieldValue("reasonForConcession", "");
        setFieldValue("reasonId", "");
        setFetchError(false);
      }
    };

    fetchStudentDetails();
  }, [admissionNo, setFieldValue, setFetchError]);

  return null;
};

const StudentInformation = ({ onNext, saleData = null }) => {
  const [reasonOptions, setReasonOptions] = useState([]);
  const [reasonMap, setReasonMap] = useState({});
  const [languageOptions, setLanguageOptions] = useState([]);
  const [languageIdMap, setLanguageIdMap] = useState({}); // Added for langId mapping
  const [firstLanguageOptions, setFirstLanguageOptions] = useState([]);
  const [secondLanguageOptions, setSecondLanguageOptions] = useState([]);
  const [thirdLanguageOptions, setThirdLanguageOptions] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [headerItems, setHeaderItems] = useState([
    { label: "Application No", value: "" },
    { label: "PRO Name", value: "" },
    { label: "PRO Mobile No", value: "" },
    { label: "PRO Campus", value: "" },
  ]);
  const location = useLocation();

  // State to track admissionNo - prioritize applicationNo from location state
  const [admissionNo, setAdmissionNo] = useState(
    location.state?.initialValues?.applicationNo ||
    location.state?.applicationNo ||
    saleData?.applicationNo ||
    ""
  );

  // Log initial admissionNo for debugging
  useEffect(() => {
    console.log("Initial admissionNo:", admissionNo, "location.state:", location.state, "saleData:", saleData);
  }, [admissionNo, location.state, saleData]);

  // Define initialValues before useEffect hooks
  const initialValues = {
    admissionNo: admissionNo,
    studentName: location.state?.initialValues?.studentName || saleData?.studentName || "",
    surname: location.state?.initialValues?.surname || saleData?.surname || "",
    parentName: location.state?.initialValues?.parentName || saleData?.fatherName || saleData?.motherName || "",
    fatherName: location.state?.initialValues?.fatherName || saleData?.fatherName || "",
    motherName: location.state?.initialValues?.motherName || saleData?.motherName || "",
    parentRelationId: location.state?.initialValues?.parentRelationId || (saleData?.fatherName ? 1 : saleData?.motherName ? 2 : 0),
    gender: location.state?.initialValues?.gender || saleData?.gender || "Male",
    applicationFee:
      location.state?.initialValues?.applicationFee ||
      saleData?.amount ||
      saleData?.appFeeAmount ||
      saleData?.appFee ||
      "",
    initialAmount: location.state?.initialValues?.initialAmount || "",
    firstYearConcession: location.state?.initialValues?.firstYearConcession || saleData?.yearConcession1st || "",
    secondYearConcession: location.state?.initialValues?.secondYearConcession || saleData?.yearConcession2nd || "",
    thirdYearConcession: location.state?.initialValues?.thirdYearConcession || saleData?.yearConcession3rd || "",
    reasonForConcession: location.state?.initialValues?.reasonForConcession || saleData?.reason || "",
    reasonId: location.state?.initialValues?.reasonId || saleData?.reasonId || "",
    firstLanguage: location.state?.initialValues?.firstLanguage || "",
    secondLanguage: location.state?.initialValues?.secondLanguage || "",
    thirdLanguage: location.state?.initialValues?.thirdLanguage || "",
    firstLanguageId: location.state?.initialValues?.firstLanguageId || "",
    secondLanguageId: location.state?.initialValues?.secondLanguageId || "",
    thirdLanguageId: location.state?.initialValues?.thirdLanguageId || "",
    minInitialAmount: location.state?.initialValues?.minInitialAmount || 0,
  };

  // Fetch header items
  useEffect(() => {
    const fetchHeaderItems = async () => {
      if (!admissionNo) {
        console.warn("No admissionNo provided for fetching employee details");
        setHeaderItems([
          { label: "Application No", value: "N/A" },
          { label: "PRO Name", value: "N/A" },
          { label: "PRO Mobile No", value: "N/A" },
          { label: "PRO Campus", value: "N/A" },
        ]);
        return;
      }

      try {
        const data = await apiService.getEmployeeDetails(admissionNo);
        console.log("Employee details fetched for admissionNo:", admissionNo, data);
        setHeaderItems([
          { label: "Application No", value: admissionNo || "N/A" },
          { label: "PRO Name", value: data.employeeName || "N/A" },
          { label: "PRO Mobile No", value: data.employeeMobileNo || "N/A" },
          { label: "PRO Campus", value: data.campusName || "N/A" },
        ]);
      } catch (err) {
        console.error("Failed to fetch employee details for admissionNo:", admissionNo, err);
        setHeaderItems([
          { label: "Application No", value: admissionNo || "N/A" },
          { label: "PRO Name", value: "N/A" },
          { label: "PRO Mobile No", value: "N/A" },
          { label: "PRO Campus", value: "N/A" },
        ]);
      }
    };

    fetchHeaderItems();
  }, [admissionNo]);

  // Fetch concession reasons
  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const data = await apiService.getConcessionReasons();
        console.log("Concession Reasons API response:", data);
        const labels = [];
        const map = {};
        data.forEach((r) => {
          if (r.conc_reason) {
            labels.push(r.conc_reason);
            map[r.conc_reason] = r.conc_reason_id;
          }
        });
        setReasonOptions(labels);
        setReasonMap(map);
        console.log("Reason map:", map);
      } catch (err) {
        console.error("Failed to fetch reasons:", err);
      }
    };
    fetchReasons();
  }, []);

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await apiService.getLanguages();
        console.log("Languages API response:", data);
        if (Array.isArray(data)) {
          const options = data.map((lang) => lang.lang_name);
          const map = {};
          data.forEach((lang) => {
            map[lang.lang_name] = lang.lang_id || 0;
          });
          setLanguageOptions(options);
          setLanguageIdMap(map);
          setFirstLanguageOptions(options);
          console.log("Language map:", map);
        } else {
          console.warn("No languages found");
          setLanguageOptions([]);
          setLanguageIdMap({});
          setFirstLanguageOptions([]);
        }
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        setLanguageOptions([]);
        setLanguageIdMap({});
        setFirstLanguageOptions([]);
      }
    };
    fetchLanguages();
  }, []);

  // Update second and third language options based on selections
  useEffect(() => {
    const updateLanguageOptions = () => {
      const selectedFirst = initialValues.firstLanguage;
      const selectedSecond = initialValues.secondLanguage;

      setSecondLanguageOptions(
        languageOptions.filter((lang) => lang !== selectedFirst)
      );

      setThirdLanguageOptions(
        languageOptions.filter(
          (lang) => lang !== selectedFirst && lang !== selectedSecond
        )
      );
    };

    updateLanguageOptions();
  }, [initialValues.firstLanguage, initialValues.secondLanguage, languageOptions]);

  const fields = [
    { label: "Admission No.", name: "admissionNo", required: true },
    { label: "Student Name", name: "studentName", disabled: true },
    { label: "Surname", name: "surname", disabled: true },
    { label: "Parent Name", name: "parentName", disabled: true },
    { label: "Application Fee", name: "applicationFee", disabled: true },
    { label: "Initial Amount", name: "initialAmount", required: true },
    { label: "1st Year Concession", name: "firstYearConcession", disabled: true },
    { label: "2nd Year Concession", name: "secondYearConcession", disabled: true },
    { label: "3rd Year Concession", name: "thirdYearConcession" },
  ];

  const validationSchema = Yup.object().shape({
    admissionNo: Yup.string().required("Admission No. is required"),
    initialAmount: Yup.number()
      .typeError("Amount must be a valid number.")
      .positive("Amount must be a valid number.")
      .min(
        Yup.ref("minInitialAmount"),
        ({ min }) => `Amount must be at least ${min}.`
      )
      .required("This field is required."),
    firstYearConcession: Yup.number()
      .typeError("Amount must be a valid number.")
      .min(0, "Amount must be a valid number.")
      .nullable(true),
    secondYearConcession: Yup.number()
      .typeError("Amount must be a valid number.")
      .min(0, "Amount must be a valid number.")
      .nullable(true),
    thirdYearConcession: Yup.number()
      .typeError("Amount must be a valid number.")
      .min(0, "Amount must be a valid number.")
      .nullable(true),
    reasonForConcession: Yup.string().when(
      ["firstYearConcession", "secondYearConcession", "thirdYearConcession"],
      {
        is: (f1, f2, f3) =>
          !!(parseFloat(f1) > 0 || parseFloat(f2) > 0 || parseFloat(f3) > 0),
        then: (schema) => schema.required("This field is required."),
        otherwise: (schema) => schema.notRequired(),
      }
    ),
    firstLanguage: Yup.string().required("First Language is required"),
    secondLanguage: Yup.string().nullable(true),
    thirdLanguage: Yup.string().nullable(true),
  });

  return (
    <div className={styles.Student_Information_studentInfoContainer}>
      <StudentInfoHeader items={headerItems} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const concessions =
            Number(values.firstYearConcession || 0) +
            Number(values.secondYearConcession || 0) +
            Number(values.thirdYearConcession || 0);

          const totalFee =
            Number(values.applicationFee || 0) +
            Number(values.initialAmount || 0);

          if (concessions > totalFee) {
            alert("Concession exceeds allowed maximum.");
            setSubmitting(false);
            return;
          }

          console.log("StudentInformation submitted:", values);
          onNext(values);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
          <Form
            className={styles.Student_Information_studentFormContainer}
            onSubmit={handleSubmit}
          >
            <FetchStudentDetails
              admissionNo={admissionNo}
              setFetchError={setFetchError}
            />
            <div className={styles.Student_Information_studentFormGrid}>
              {fields.map((f) =>
                f.name === "parentName" ? (
                  <React.Fragment key={f.name}>
                    <Inputbox
                      label={f.label}
                      name={f.name}
                      value={values[f.name]}
                      onChange={(e) => setFieldValue(f.name, e.target.value)}
                      disabled={f.disabled || false}
                      required={f.required || false}
                    />
                    <div
                      className={styles.Student_Information_studentFormGroup}
                    >
                      <label
                        className={styles.Student_Information_studentFormLabel}
                      >
                        Gender
                      </label>
                      <div
                        className={
                          styles.Student_Information_studentGenderButtons
                        }
                      >
                        {["Male", "Female"].map((g) => (
                          <div
                            key={g}
                            type="button"
                            className={`${styles.Student_Information_studentGenderBtn} ${
                              values.gender === g
                                ? styles.Student_Information_studentGenderBtnActive
                                : ""
                            }`}
                            onClick={() => {
                              setFieldValue("gender", g);
                              console.log("Gender selected:", g);
                            }}
                          >
                            {g}
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <div key={f.name}>
                    <Inputbox
                      label={f.label}
                      name={f.name}
                      value={values[f.name]}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setFieldValue(f.name, newValue);
                        if (f.name === "admissionNo") {
                          setAdmissionNo(newValue);
                          setFetchError(false);
                        }
                      }}
                      disabled={f.disabled || false}
                      required={f.required || false}
                    />
                    <ErrorMessage
                      name={f.name}
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                    {f.name === "admissionNo" && fetchError && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        Please re-enter the Admission No.
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Dropdown loaded from API */}
              <div>
                <Dropdown
                  dropdownname="Reason For Concession"
                  name="reasonForConcession"
                  results={reasonOptions}
                  value={values.reasonForConcession}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setFieldValue("reasonForConcession", selected);
                    const reasonId = reasonMap[selected] || "";
                    setFieldValue("reasonId", reasonId);
                    console.log("Reason for Concession selected:", { label: selected, id: reasonId });
                  }}
                />
                <ErrorMessage
                  name="reasonForConcession"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>

              {/* Language Information Row */}
              <div className={styles.Student_Information_languageRow}>
                <div className={styles.Student_Information_languageHeader}>
                  <span>Language Information</span>
                  <div className={styles.Student_Information_languageLine}></div>
                </div>
                <div className={styles.Student_Information_languageGrid}>
                  <Dropdown
                    dropdownname="First Language"
                    name="firstLanguage"
                    results={firstLanguageOptions}
                    value={values.firstLanguage}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setFieldValue("firstLanguage", selected);
                      setFieldValue("firstLanguageId", languageIdMap[selected] || "");
                      console.log("First Language selected:", { label: selected, id: languageIdMap[selected] || "" });
                      setSecondLanguageOptions(
                        languageOptions.filter((lang) => lang !== selected)
                      );
                      setThirdLanguageOptions(
                        languageOptions.filter(
                          (lang) => lang !== selected && lang !== values.secondLanguage
                        )
                      );
                    }}
                    required
                  />
                  <Dropdown
                    dropdownname="Second Language"
                    name="secondLanguage"
                    results={secondLanguageOptions}
                    value={values.secondLanguage}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setFieldValue("secondLanguage", selected);
                      setFieldValue("secondLanguageId", languageIdMap[selected] || "");
                      console.log("Second Language selected:", { label: selected, id: languageIdMap[selected] || "" });
                      setThirdLanguageOptions(
                        languageOptions.filter(
                          (lang) => lang !== values.firstLanguage && lang !== selected
                        )
                      );
                    }}
                  />
                  <Dropdown
                    dropdownname="Third Language"
                    name="thirdLanguage"
                    results={thirdLanguageOptions}
                    value={values.thirdLanguage}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setFieldValue("thirdLanguage", selected);
                      setFieldValue("thirdLanguageId", languageIdMap[selected] || "");
                      console.log("Third Language selected:", { label: selected, id: languageIdMap[selected] || "" });
                    }}
                  />
                </div>
                <div className={styles.Student_Information_languageErrors}>
                  <ErrorMessage
                    name="firstLanguage"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                  <ErrorMessage
                    name="secondLanguage"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                  <ErrorMessage
                    name="thirdLanguage"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.Student_Information_studentFormFooter}>
              <Button
                type="submit"
                variant="primary"
                buttonname="Proceed to Add Payment Info"
                righticon={<TrendingUpIcon />}
                className={styles.Damaged_damaged_Submit_Button}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentInformation;