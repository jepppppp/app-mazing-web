import React, { useState, useEffect, useRef } from "react";
import { LoggedInNavbar } from "../components";
import { TextInput, Table } from "flowbite-react";

import { FaSearch } from "react-icons/fa";
import moment from "moment";
import { getAudit } from "../services/audit";
const Audit = () => {
  const [data, setData] = useState([]);

  const load = async () => {
    const { success, data } = await getAudit();
    if (success) setData(data);
  };

  const tableHeaders = [
    "#",
    "ID Number",
    "Name",
    "Grade Level",
    "Description",
    "Date",
  ];
  const [search, setSearch] = useState("");
  const filteredSearch = data.filter(
    (d) =>
      d.full_name.toLowerCase().includes(search.toLowerCase()) ||
      d.id_number.toLowerCase().includes(search.toLowerCase())
  );
  const SectionTable = (data) => {
    return (
      <>
        <div className="flex xs:items-center items-start justify-between gap-4 mb-4 flex-col sm:flex-row">
          <TextInput
            id="search"
            type="text"
            icon={FaSearch}
            placeholder="Search for anything"
            onChange={(e) => setSearch(e.target.value)}
            required={true}
            value={search}
            className="font-work w-full text-sm"
          />
        </div>

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
                    {item.id_number}
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item.full_name}
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item?.grade}
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item?.description}
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {moment(item?.createdAt).format("MMM DD, YYYY HH:mm A")}
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

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <LoggedInNavbar activePage="audit" />
      <div className="p-5 flex flex-col gap-5">
        <div className="mx-auto max-w-[80rem] w-full">
          <p className="font-bold text-2xl text-primary font-work mb-4">
            Audit Logs
          </p>
          {SectionTable(filteredSearch)}
        </div>
      </div>
    </>
  );
};

export default Audit;
