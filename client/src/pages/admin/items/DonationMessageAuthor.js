import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../../../components/containers/Footer';
import Header from '../../../components/containers/Header';
import { CardBody, CardTitle, SectionTitle } from '../../../components/text';
import Spinner from '../../../components/UI/spinner';
import { useSelector } from 'react-redux';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import Input from '../../../components/UI/input';
import Modal from '../../../components/UI/modal';
import {
  MdSkipPrevious,
  MdSkipNext,
  MdEdit,
  MdDelete,
  MdArchive,
} from 'react-icons/md';
import axios from '../../../axios-base';
import { Button } from '../../../components/UI/button';
import RichTextEditor from '../../../components/UI/RichTextEditor';
import parse from 'html-react-parser';
import { useFetchAllDonationMessagesQuery } from '../../../features/API/admin-api-slice';

const DonationMessageAuthor = () => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const token = useSelector((state) => state.global.token);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isFetching, refetch } = useFetchAllDonationMessagesQuery();
  const [enDescription, setEnDescription] = useState('');
  const [frDescription, setFrDescription] = useState('');
  const [rwDescription, setRwDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donationMessageId, setDonationMessageId] = useState('');

  const updateForm = useCallback(
    (donationMessageId) => {
      setLoading(true);
      axios
        .get(`/api/donationmessages/${donationMessageId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setEnDescription(res.data.results.description.en);
          setFrDescription(res.data.results.description.fr);
          setRwDescription(res.data.results.description.rw);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(err.response.data);
        });
    },
    [token]
  );
  const myData = useMemo(
    () =>
      data?.results
        ? data.results.map((donationMessage, index) => {
            return {
              id: index + 1,
              description: parse(donationMessage.description[selectedLanguage]),
              updatedBy: donationMessage.updatedBy.name,
              updatedAt: donationMessage.updatedAt,
              status: donationMessage.isActive,
              _id: donationMessage._id,
            };
          })
        : [],
    [data, selectedLanguage]
  );
  const columns = useMemo(
    () => [
      { Header: 'N0', accessor: 'id' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'UpdatedBy', accessor: 'updatedBy' },
      {
        Header: 'UpdatedAt',
        accessor: 'updatedAt',
        Cell: ({ value }) => {
          return new Date(value).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          return value ? 'Active' : 'Inactive';
        },
      },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => {
          return (
            <div className="flex space-x-2 justify-center">
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setDonationMessageId(value);
                  setError(null);
                  setIsUpdating(true);
                  setShowEditModal(true);
                  updateForm(value);
                }}
              >
                <MdEdit />
              </button>
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setShowArchiveModal(true);
                  setDonationMessageId(value);
                  setError(null);
                }}
              >
                <MdArchive />
              </button>
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDonationMessageId(value);
                  setError(null);
                }}
              >
                <MdDelete color="#751E17" />
              </button>
            </div>
          );
        },
      },
    ],
    [updateForm]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data: myData },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = state;

  const handleAdd = useCallback(() => {
    if (
      enDescription !== '' &&
      frDescription !== '' &&
      rwDescription !== ''
    ) {
      setLoading(true);
      setError(null);
      const formData = {
        enDescription,
        frDescription,
        rwDescription,
      };
      axios
        .post('/api/donationmessages/add', formData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setLoading(false);
          setShowEditModal(false);
          refetch();
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    } else {
      setError({ error: t('All fields must be filled') });
    }
  }, [
    enDescription,
    frDescription,
    rwDescription,
    token,
    t,
    refetch,
  ]);

  const handleUpdate = useCallback(() => {
    if (
      enDescription !== '' &&
      frDescription !== '' &&
      rwDescription !== ''
    ) {
      setLoading(true);
      setError(null);
      const formData = {
        enDescription,
        frDescription,
        rwDescription,
      };
      axios
        .patch(`/api/donationmessages/${donationMessageId}`, formData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setLoading(false);
          setShowEditModal(false);
          refetch();
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    } else {
      setError({ error: t('All fields must be filled') });
    }
  }, [
    enDescription,
    frDescription,
    rwDescription,
    token,
    t,
    refetch,
    donationMessageId,
  ]);

  const handleArchive = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .patch(`/api/donationmessages/archive/${donationMessageId}`, null, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        setShowArchiveModal(false);
        refetch();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }, [token, donationMessageId, refetch]);

  const handleDelete = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .delete(`/api/donationmessages/${donationMessageId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        setShowDeleteModal(false);
        refetch();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }, [token, donationMessageId, refetch]);

  return (
    <div>
      <Modal
        show={showEditModal}
        modalClosed={(e) => {
          setShowEditModal(false);
        }}
      >
        <CardTitle
          name={`${isUpdating ? t('Update About us') : t('Add new About us')}`}
          color="red"
        />
        <RichTextEditor
          label={t('English Description')}
          value={enDescription}
          onChange={(text) => setEnDescription(text)}
          placeholder={t('English Description')}
        />
        <RichTextEditor
          label={t('French Description')}
          value={frDescription}
          onChange={(text) => setFrDescription(text)}
          placeholder={t('French Description')}
        />
        <RichTextEditor
          label={t('Kinyarwanda Description')}
          value={rwDescription}
          onChange={(text) => setRwDescription(text)}
          placeholder={t('Kinyarwanda Description')}
        />
        {loading && <Spinner />}
        {error && (
          <CardBody name={error.error} color="red" additional="font-semibold" />
        )}
        <Button
          name={t('Submit')}
          isSquare
          outline="false"
          color="red"
          additional="mt-3"
          clicked={isUpdating ? () => handleUpdate(donationMessageId) : handleAdd}
        />
      </Modal>
      <Modal
        show={showArchiveModal}
        small
        modalClosed={(e) => {
          setShowArchiveModal(false);
        }}
      >
        <CardTitle name={t('Archive donation messsage')} color="red" />
        <CardBody
          name={t('Are you sure you want to archive/unarchive this donation messsage?')}
        />
        {loading && <Spinner />}
        {error && (
          <CardBody name={error.error} color="red" additional="font-semibold" />
        )}
        <div className="flex justify-between">
          <Button
            name={t('Cancel')}
            isSquare
            outline="false"
            color="blue"
            clicked={() => setShowArchiveModal(false)}
          />
          <Button
            name={t('Archive/Unarchive')}
            isSquare
            outline="false"
            color="red"
            clicked={handleArchive}
          />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        small
        modalClosed={(e) => {
          setShowDeleteModal(false);
        }}
      >
        <CardTitle name={t('Delete donation messsage')} color="red" />
        <CardBody
          name={`${t('Are you sure you want to delete this donation messsage?')} ${t(
            'Contents deleted can not be retrieved.'
          )}`}
        />
        {loading && <Spinner />}
        {error && (
          <CardBody name={error.error} color="red" additional="font-semibold" />
        )}
        <div className="flex justify-between">
          <Button
            name={t('Cancel')}
            isSquare
            outline="false"
            color="blue"
            clicked={() => setShowDeleteModal(false)}
          />
          <Button
            name={t('Delete')}
            isSquare
            outline="false"
            color="red"
            clicked={handleDelete}
          />
        </div>
      </Modal>
      <Header />
      <div className="w-70% m-auto py-10">
        <SectionTitle name={t('List of all donation messsage')} />
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto relative py-5">
            <div className="flex justify-between items-center">
              <div className="w-1/3 py-3">
                <Input
                  label={t('Search')}
                  elementType="input"
                  elementConfig={{
                    type: 'text',
                    placeholder: t('Search'),
                  }}
                  value={globalFilter}
                  changed={setGlobalFilter}
                />
              </div>
              <Button
                name={t('Add new donation messsage')}
                isSquare
                outline="false"
                color="blue"
                clicked={() => {
                  setShowEditModal(true);
                  setIsUpdating(false);
                  setEnDescription('');
                  setFrDescription('');
                  setRwDescription('');
                  setError(null);
                }}
              />
            </div>
            <table {...getTableProps()} className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-red text-white">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps)}
                        className="border border-gray-500 p-2 text-center"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="odd:bg-white even:bg-gray-100"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="border border-gray-500 p-2 text-center"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex space-x-2 justify-center py-2 items-end">
              <button
                className="cursor-pointer"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <MdSkipPrevious size={20} color="#751E17" />
              </button>
              <span>
                page {pageIndex + 1} of {pageOptions.length}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <MdSkipNext size={20} color="#751E17" />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DonationMessageAuthor;