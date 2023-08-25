import React, { useState, useEffect, useRef } from "react";
import { Card, Label, Select, input, Button, Table } from "flowbite-react";
import { FaRegFileAlt, FaFileCsv, FaSearch } from "react-icons/fa";
import moment from "moment";
import { Toaster, toast } from "react-hot-toast";
import { toastOptions } from "../styles/modalOptions";
import { downloadFile } from "../services/excel.services";
import Script from "next/script";
import { LoggedInNavbar } from "../components";
import { formatDateForBirthday } from "../hooks/adjust-date";
import { getAllUser } from "../services/user.services";
import { getReports } from "../services/report.services";

const Reports = () => {
  const [dateStart, setDateStart] = useState(
    formatDateForBirthday(moment().add(-1, "days"))
  );
  const targetRef = useRef();
  const [data, setData] = useState([]);
  const [dateEnd, setDateEnd] = useState(formatDateForBirthday(new Date()));
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const downloadHandler = () => {
    if (data?.length == 0) {
      toast.error("No report has been generated!", toastOptions);
      return;
    }
    downloadFile(data);
  };
  const load = async () => {
    await getAllUser(2)
      .then((res) => {
        setStudents(res?.data);
      })
      .catch((e) => toast.error("Something went wrong", toastOptions));
  };
  useEffect(() => {
    load();
  }, []);
  const generateHandler = async () => {
    if (search?.trim().length == 0) {
      toast.error("Please select student first!", toastOptions);
      return;
    }
    toast.dismiss();
    if (dateStart > dateEnd) {
      toast.error("Invalid selection of date!", toastOptions);
      return;
    }
    const newData = {
      lrn: targetRef.current?.id_number,
      from: dateStart,
      to: dateEnd,
    };
    const res_data = await getReports(newData);
    setData(res_data?.data);
    if (res_data?.data?.length > 0) {
      toast.success("Reports Generated Successfully!", toastOptions);
    } else {
      toast.error("No report has been generated!", toastOptions);
    }
  };
  const final_students = students.filter(
    (d) =>
      d?.first_name
        ?.toString()
        .toLowerCase()
        .includes(search?.toString().toLowerCase()) ||
      d?.last_name
        ?.toString()
        .toLowerCase()
        .includes(search?.toString().toLowerCase()) ||
      d?.id_number
        ?.toString()
        .toLowerCase()
        .includes(search?.toString().toLowerCase())
  );
  const GAMES = [
    {
      label: "Birthday Candle Counting",
      value: 1,
    },
    {
      label: "Connect the number",
      value: 2,
    },

    {
      label: "Math Symbol",
      value: 3,
    },
    {
      label: "Bubble Game",
      value: 4,
    },
    {
      label: "Balloon Game",
      value: 5,
    },
    {
      label: "Owl Game",
      value: 6,
    },
    {
      label: "Object Number Recognition ",
      value: 7,
    },
    {
      label: "Balance the cups",
      value: 9,
    },
    {
      label: "Multi Pobble Game",
      value: 10,
    },
    {
      label: "Charting Treasure",
      value: 11,
    },
  ];

  const tableHeaders = [
    "#",
    "TimeStamp",
    "LRN",
    "Name",
    "Game Title",
    "Duration",
  ];
  const SectionTable = () => {
    return (
      <>
        <Table striped={true} className="font-work">
          <Table.Head className="text-center bg-cstmgray text-white">
            {tableHeaders.map((header, index) => (
              <Table.HeadCell colSpan={header == "Action" ? 3 : 1} key={index}>
                {header}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.length > 0 ? (
              data?.map((item, index) => (
                <Table.Row key={index} className="text-center">
                  <Table.Cell className="text-primary font-bold">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="text-black">
                    {moment(item.createdAt).format("MMM DD, YYYY hh:mm:ss A")}
                  </Table.Cell>

                  <Table.Cell className="text-black">{item.lrn}</Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell className="text-black">
                    {
                      GAMES.filter((g) => g?.value == item?.game_title)[0]
                        ?.label
                    }
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item.points}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-2 text-center">
                  No data
                </td>
              </tr>
            )}
          </Table.Body>
        </Table>
      </>
    );
  };
  return (
    <div className="font-work">
      <Toaster />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js" />
      <LoggedInNavbar activePage={"reports"} />
      <div className="p-5 flex flex-col gap-5">
        <div className=" flex items-center justify-center">
          <Card className="w-full overflow-auto">
            <h1 className="text-xl text-primary font-bold">Generate Report</h1>

            <div className="w-full">
              <div className="block mb-2 ">
                <input
                  type="text"
                  placeholder="Search name here"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="max-h-20 overflow-auto">
                <ul className="">
                  {final_students?.map((item, key) => (
                    <li
                      onClick={() => {
                        targetRef.current = item;
                        setSearch(`${item.first_name} ${item?.last_name}`);
                      }}
                      className="p-2 px-4 cursor-pointer hover:bg-zinc-100"
                      key={key}
                    >
                      {item?.first_name} {item?.last_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full">
                <div className="block mb-2 ">
                  <Label
                    className="font-work "
                    htmlFor="datepicker"
                    value="Select Date Range"
                  />
                </div>
                <div
                  id="datepicker"
                  className="flex items-center font-work sm:flex-row flex-col gap-4"
                >
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="date"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      value={dateStart}
                      max={moment().add(-1, "days").format("yyyy-MM-DD")}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="date"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                      max={moment().format("yyyy-MM-DD")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-end">
              <Button color="success" onClick={generateHandler}>
                Generate
              </Button>

              <Button disabled={data?.length == 0} onClick={downloadHandler}>
                Download
              </Button>
            </div>

            {data?.length > 0 && <SectionTable />}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
