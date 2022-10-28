import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../../../components/containers/Footer';
import Header from '../../../components/containers/Header';
import { CardBody, CardTitle, SectionTitle } from '../../../components/text';
import Spinner from '../../../components/UI/spinner';
import { useFetchAllDepartmentsQuery } from '../../../features/API/admin-api-slice';
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
import FileUpload from '../../../components/UI/FileUpload';

const DepartmentAuthor = () => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const token = useSelector((state) => state.global.token);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isFetching, refetch } = useFetchAllDepartmentsQuery();
  const [enName, setEnName] = useState('');
  const [frName, setFrName] = useState('');
  const [rwName, setRwName] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [frDescription, setFrDescription] = useState('');
  const [rwDescription, setRwDescription] = useState('');
  const [enSmallDescription, setEnSmallDescription] = useState('');
  const [frSmallDescription, setFrSmallDescription] = useState('');
  const [rwSmallDescription, setRwSmallDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [departmentId, setDepartmentId] = useState('');

  const updateForm = useCallback(
    (departmentId) => {
      setLoading(true);
      axios
        .get(`/api/departments/${departmentId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setEnName(res.data.results.name.en);
          setFrName(res.data.results.name.fr);
          setRwName(res.data.results.name.rw);
          setEnDescription(res.data.results.description.en);
          setFrDescription(res.data.results.description.fr);
          setRwDescription(res.data.results.description.rw);
          setEnSmallDescription(res.data.results.smallDescription.en);
          setFrSmallDescription(res.data.results.smallDescription.fr);
          setRwSmallDescription(res.data.results.smallDescription.rw);
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
        ? data.results.map((department, index) => {
            return {
              id: index + 1,
              name: department.name[selectedLanguage],
              updatedBy: department.updatedBy.name,
              updatedAt: department.updatedAt,
              status: department.isActive,
              _id: department._id,
            };
          })
        : [],
    [data, selectedLanguage]
  );
  const columns = useMemo(
    () => [
      { Header: 'N0', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
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
                  setDepartmentId(value);
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
                  setDepartmentId(value);
                  setError(null);
                }}
              >
                <MdArchive />
              </button>
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDepartmentId(value);
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
      enName !== '' &&
      frName !== '' &&
      rwName !== '' &&
      enDescription !== '' &&
      frDescription !== '' &&
      rwDescription !== '' &&
      enSmallDescription !== '' &&
      frSmallDescription !== '' &&
      rwSmallDescription !== '' &&
      selectedFiles != null
    ) {
      setLoading(true);
      setShowProgressBar(true);
      setError(null);
      const formData = new FormData();
      formData.append('enName', enName);
      formData.append('frName', frName);
      formData.append('rwName', rwName);
      formData.append('enSmallDescription', enSmallDescription);
      formData.append('frSmallDescription', frSmallDescription);
      formData.append('rwSmallDescription', rwSmallDescription);
      formData.append('enDescription', enDescription);
      formData.append('frDescription', frDescription);
      formData.append('rwDescription', rwDescription);
      formData.append('images', selectedFiles[0]);
      axios
        .post('/api/departments/add', formData, {
          headers: { Authorization: token },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round(progressEvent.loaded / progressEvent.total) * 100
            );
          },
        })
        .then((res) => {
          setLoading(false);
          setShowEditModal(false);
          setShowProgressBar(false);
          refetch();
        })
        .catch((err) => {
          setLoading(false);
          setShowProgressBar(false);
          setError(err.response.data);
        });
    } else {
      setError({ error: t('All fields must be filled') });
    }
  }, [
    enName,
    frName,
    rwName,
    enDescription,
    frDescription,
    rwDescription,
    enSmallDescription,
    frSmallDescription,
    rwSmallDescription,
    selectedFiles,
    token,
    t,
    refetch,
  ]);

  const handleUpdate = useCallback(() => {
    if (
      enName !== '' &&
      frName !== '' &&
      rwName !== '' &&
      enDescription !== '' &&
      frDescription !== '' &&
      rwDescription !== '' &&
      enSmallDescription !== '' &&
      frSmallDescription !== '' &&
      rwSmallDescription !== ''
    ) {
      setLoading(true);
      setShowProgressBar(true);
      setError(null);
      const formData = new FormData();
      formData.append('enName', enName);
      formData.append('frName', frName);
      formData.append('rwName', rwName);
      formData.append('enSmallDescription', enSmallDescription);
      formData.append('frSmallDescription', frSmallDescription);
      formData.append('rwSmallDescription', rwSmallDescription);
      formData.append('enDescription', enDescription);
      formData.append('frDescription', frDescription);
      formData.append('rwDescription', rwDescription);
      if (selectedFiles) {
        formData.append('image', selectedFiles[0]);
      }
      axios
        .patch(`/api/departments/${departmentId}`, formData, {
          headers: { Authorization: token },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round(progressEvent.loaded / progressEvent.total) * 100
            );
          },
        })
        .then((res) => {
          setLoading(false);
          setShowProgressBar(false);
          setShowEditModal(false);
          refetch();
        })
        .catch((err) => {
          setLoading(false);
          setShowProgressBar(false);
          setError(err.response.data);
        });
    } else {
      setError({ error: t('All fields must be filled') });
    }
  }, [
    enName,
    frName,
    rwName,
    enDescription,
    frDescription,
    rwDescription,
    enSmallDescription,
    frSmallDescription,
    rwSmallDescription,
    selectedFiles,
    token,
    t,
    refetch,
    departmentId,
  ]);

  const handleArchive = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .patch(`/api/departments/archive/${departmentId}`, null, {
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
  }, [token, departmentId, refetch]);

  const handleDelete = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .delete(`/api/departments/${departmentId}`, {
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
  }, [token, departmentId, refetch]);

  return (
    <div>
      <Modal
        show={showEditModal}
        modalClosed={(e) => {
          setShowEditModal(false);
        }}
      >
        <CardTitle
          name={`${
            isUpdating ? t('Update department') : t('Add new department')
          }`}
          color="red"
        />
        <div className="flex space-x-2">
          <Input
            label={t('English name')}
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('English name'),
            }}
            value={enName}
            changed={setEnName}
            validation={{ required: true, maxLength: 100 }}
            shouldValidate
            error={t(
              'English name is required and should be less than 100 characters'
            )}
          />
          <Input
            label={t('French name')}
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('French name'),
            }}
            value={frName}
            changed={setFrName}
            validation={{ required: true, maxLength: 100 }}
            shouldValidate
            error={t(
              'French name is required and should be less than 100 characters'
            )}
          />
          <Input
            label={t('Kinyarwanda name')}
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('Kinyarwanda name'),
            }}
            value={rwName}
            changed={setRwName}
            validation={{ required: true, maxLength: 100 }}
            shouldValidate
            error={t(
              'Kinyarwanda name is required and should be less than 100 characters'
            )}
          />
        </div>
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
        <RichTextEditor
          label={t('English Small Description')}
          value={enSmallDescription}
          onChange={(text) => setEnSmallDescription(text)}
          placeholder={t('English Small Description')}
        />
        <RichTextEditor
          label={t('French Small Description')}
          value={frSmallDescription}
          onChange={(text) => setFrSmallDescription(text)}
          placeholder={t('French Small Description')}
        />
        <RichTextEditor
          label={t('Kinyarwanda Small Description')}
          value={rwSmallDescription}
          onChange={(text) => setRwSmallDescription(text)}
          placeholder={t('Kinyarwanda Small Description')}
        />
        <FileUpload
          elementConfig={{
            accept: 'image/*',
          }}
          btnName="Upload image"
          uploadProgress={uploadProgress}
          showProgressBar={showProgressBar}
          setSelectedFiles={setSelectedFiles}
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
          clicked={isUpdating ? () => handleUpdate(departmentId) : handleAdd}
        />
      </Modal>
      <Modal
        show={showArchiveModal}
        small
        modalClosed={(e) => {
          setShowArchiveModal(false);
        }}
      >
        <CardTitle name={t('Archive department')} color="red" />
        <CardBody
          name={t(
            'Are you sure you want to archive/unarchive this department?'
          )}
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
        <CardTitle name={t('Delete department')} color="red" />
        <CardBody
          name={`${t('Are you sure you want to delete this department?')} ${t(
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
        <SectionTitle name={t('List of all department')} />
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
                name={t('Add new department')}
                isSquare
                outline="false"
                color="blue"
                clicked={() => {
                  setShowEditModal(true);
                  setIsUpdating(false);
                  setEnName('');
                  setFrName('');
                  setRwName('');
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

export default DepartmentAuthor;
