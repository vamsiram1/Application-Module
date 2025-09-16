import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Modal } from "@mui/material";
import { useLocation } from "react-router-dom";
import crossicon from "../../assets/application-status/crossicon";
import Button from "../Button/Button";
import styles from "./ApplicationStatusDataTable.module.css";

const ApplicationStatusDataTable = ({
  columns,
  data,
  onUpdate,
  onSelectRow,
  pageIndex,
  setPageIndex,
  pageSize,
  totalData,
  fieldMapping = {},
  formComponent: FormComponent,
  onNavigateToSale,
  onNavigateToConfirmation,
  onNavigateToDamage,
}) => {
  const { pathname } = useLocation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const isIndeterminate =
    table.getRowModel().rows.some((r) => r.original.isSelected) &&
    !table.getRowModel().rows.every((r) => r.original.isSelected);

  const mapRowDataToInitialValues = (rowData) => {
    if (!rowData) return {};
    const mappedValues = {};
    Object.entries(fieldMapping).forEach(([tableField, formField]) => {
      mappedValues[formField] = rowData[tableField] || "";
    });
    return { ...rowData, ...mappedValues };
  };

  const handleUpdateClick = (rowData) => {
    if (!rowData || !FormComponent) return;
    setSelectedRow(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleFormSubmit = (values) => {
    if (!selectedRow) return;
    const updatedRow = { ...selectedRow };
    Object.entries(fieldMapping).forEach(([tableField, formField]) => {
      updatedRow[tableField] = values[formField] || updatedRow[tableField];
    });
    onUpdate(updatedRow);
    handleClose();
  };

  const handleStatusUpdate = (rowData, status) => {
    // Normalize status to handle case variations
    const normalizedStatus = status?.toLowerCase()?.trim();
    
    switch (normalizedStatus) {
      case "with pro":
      case "available":
        if (onNavigateToSale) {
          onNavigateToSale(rowData);
        } else {
          console.warn("onNavigateToSale callback is not provided");
        }
        break;
      case "sold":
      case "not confirmed":
        if (onNavigateToConfirmation) {
          onNavigateToConfirmation(rowData);
        } else {
          console.warn("onNavigateToConfirmation callback is not provided");
        }
        break;
      case "damaged":
        if (onNavigateToDamage) {
          onNavigateToDamage(rowData);
        } else {
          console.warn("onNavigateToDamage callback is not provided");
        }
        break;
      case "confirmed":
        // Button is disabled for confirmed status, no action needed
        break;
      default:
        // Fallback to Sale page for unrecognized statuses
        if (onNavigateToSale) {
          onNavigateToSale(rowData);
        } else {
          console.warn("onNavigateToSale callback is not provided for default case");
        }
        break;
    }
  };

  const getModalHeading = () => {
    if (pathname.includes("zone")) {
      return "Update Distribution to Zone";
    } else if (pathname.includes("dgm")) {
      return "Update Distribution to DGM";
    } else if (pathname.includes("campus")) {
      return "Update Distribution to Campus";
    }
    return "Update Application"; // Fallback
  };

  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.empty_head_column}></th>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.table_header}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))
            )}
            <th className={styles.table_header_empty}></th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.table_row}>
              <td className={styles.checkbox_cell}>
                <input
                  type="checkbox"
                  className={styles.custom_checkbox}
                  checked={row.original.isSelected || false}
                  onChange={(e) => onSelectRow(row.original, e.target.checked)}
                />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.table_cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className={styles.table_cell}>
                <button
                  onClick={() => handleStatusUpdate(row.original, row.original.status)}
                  className={styles.update_btn}
                  disabled={row.original.status?.toLowerCase()?.trim() === "confirmed"}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination_content}>
        <span className={styles.pagination_content_left}>
          Showing{" "}
          <span className={styles.pagination_highlight}>
            {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, totalData)}
          </span>{" "}
          of <span className={styles.pagination_highlight}>{totalData}</span> Entries
        </span>
        <div className={styles.pagination_content_right}>
          <span className={styles.pagination_info}>
            {pageIndex + 1} - {Math.ceil(totalData / pageSize)} of{" "}
            {Math.ceil(totalData / pageSize)}
          </span>
          <div className={styles.pagination_buttons}>
            <Button
              buttonname="Prev"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              type="button"
            />
            <Button
              buttonname="Next"
              onClick={() =>
                setPageIndex((prev) =>
                  (prev + 1) * pageSize < totalData ? prev + 1 : prev
                )
              }
              disabled={(pageIndex + 1) * pageSize >= totalData}
              type="button"
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-form-modal"
        aria-describedby="update-form-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.modal_top}>
            <div className={styles.modal_top_left}>
              <p className={styles.modal_heading}>{getModalHeading()}</p>
              <p className={styles.modal_sub}>
                Distribute Applications to all Zones, DGM, and Campuses
              </p>
            </div>
            <div className={styles.xicon} onClick={handleClose}>
              {crossicon}
            </div>
          </div>
          <div className={styles.modal_form}>
            {selectedRow && FormComponent && (
              <FormComponent
                onSubmit={handleFormSubmit}
                initialValues={mapRowDataToInitialValues(selectedRow)}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationStatusDataTable;