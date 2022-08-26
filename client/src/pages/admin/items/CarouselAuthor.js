import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../../../components/containers/Footer';
import Header from '../../../components/containers/Header';
import { CardBody, CardTitle, SectionTitle } from '../../../components/text';
import Spinner from '../../../components/UI/spinner';
import { useFetchAllCarouselsQuery } from '../../../features/API/admin-api-slice';
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
import FileUpload from '../../../components/UI/FileUpload';
import axios from '../../../axios-base';
import { Button } from '../../../components/UI/button';

const CarouselAuthor = () => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const token = useSelector((state) => state.global.token);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isFetching, refetch } = useFetchAllCarouselsQuery();
  const [enTitle, setEnTitle] = useState('');
  const [frTitle, setFrTitle] = useState('');
  const [rwTitle, setRwTitle] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [frDescription, setFrDescription] = useState('');
  const [rwDescription, setRwDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const myData = useMemo(
    () =>
      data?.results
        ? data.results.map((carousel, index) => {
            return {
              id: index + 1,
              title: carousel.title[selectedLanguage],
              updatedBy: carousel.updatedBy.name,
              updatedAt: carousel.updatedAt,
              _id: carousel._id,
            };
          })
        : [],
    [data, selectedLanguage]
  );
  const columns = useMemo(
    () => [
      { Header: 'N0', accessor: 'id' },
      { Header: 'Title', accessor: 'title' },
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
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => {
          return (
            <div className="flex space-x-2 justify-center">
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setIsUpdating(true);
                  setShowEditModal(true);
                }}
              >
                <MdEdit />
              </button>
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => setShowArchiveModal(true)}
              >
                <MdArchive />
              </button>
              <button
                className="border border-gray-500 rounded-md p-0.5 cursor-pointer hover:bg-gray-200"
                onClick={() => setShowDeleteModal(true)}
              >
                <MdDelete color="#751E17" />
              </button>
            </div>
          );
        },
      },
    ],
    []
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
      enTitle !== '' &&
      frTitle !== '' &&
      rwTitle !== '' &&
      enDescription !== '' &&
      frDescription !== '' &&
      rwDescription !== '' &&
      selectedFiles != null
    ) {
      setLoading(true);
      setShowProgressBar(true);
      setError(null);
      const formData = new FormData();
      formData.append('enTitle', enTitle);
      formData.append('frTitle', frTitle);
      formData.append('rwTitle', rwTitle);
      formData.append('enDescription', enDescription);
      formData.append('frDescription', frDescription);
      formData.append('rwDescription', rwDescription);
      if (selectedFiles) {
        formData.append('image', selectedFiles[0]);
      }
      axios
        .post('/api/carousels/add', formData, {
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
    enTitle,
    frTitle,
    rwTitle,
    enDescription,
    frDescription,
    rwDescription,
    selectedFiles,
    token,
    t,
    refetch,
  ]);
  const handleUpdate = useCallback(() => {
    setLoading(true);
    setShowProgressBar(true);
    setError(null);
    const formData = new FormData();
    formData.append('enTitle', enTitle);
    formData.append('frTitle', frTitle);
    formData.append('rwTitle', rwTitle);
    formData.append('enDescription', enDescription);
    formData.append('frDescription', frDescription);
    formData.append('rwDescription', rwDescription);
    formData.append('image', selectedFiles[0]);
    axios
      .post('/api/carousels/add', formData, {
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
      })
      .catch((err) => {
        setLoading(false);
        setShowProgressBar(false);
        setError(err.response.data);
      });
  }, [
    enTitle,
    frTitle,
    rwTitle,
    enDescription,
    frDescription,
    rwDescription,
    selectedFiles,
    token,
  ]);

  return (
    <div>
      <Modal
        show={showEditModal}
        modalClosed={(e) => {
          setShowEditModal(false);
        }}
      >
        <CardTitle
          name={`${isUpdating ? t('Update carousel') : t('Add new carousel')}`}
          color="red"
        />
        <div className="flex space-x-2">
          <Input
            label="English Title"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('English Title'),
            }}
            value={enTitle}
            changed={setEnTitle}
            validation={{ required: true }}
            shouldValidate
            error={t('English title is required')}
          />
          <Input
            label="French Title"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('French Title'),
            }}
            value={frTitle}
            changed={setFrTitle}
            validation={{ required: true }}
            shouldValidate
            error={t('French title is required')}
          />
          <Input
            label="Kinyarwanda Title"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('Kinyarwanda Title'),
            }}
            value={rwTitle}
            changed={setRwTitle}
            validation={{ required: true }}
            shouldValidate
            error={t('Kinyarwanda title is required')}
          />
        </div>
        <div className="flex space-x-2">
          <Input
            label="English Description"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('English Description'),
            }}
            value={enDescription}
            changed={setEnDescription}
            validation={{ required: true }}
            shouldValidate
            error={t('English Description is required')}
          />
          <Input
            label="French Description"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('French Description'),
            }}
            value={frDescription}
            changed={setFrDescription}
            validation={{ required: true }}
            shouldValidate
            error={t('French Description is required')}
          />
          <Input
            label="Kinyarwanda Description"
            elementType="input"
            elementConfig={{
              type: 'text',
              placeholder: t('Kinyarwanda Description'),
            }}
            value={rwDescription}
            changed={setRwDescription}
            validation={{ required: true }}
            shouldValidate
            error={t('Kinyarwanda Description is required')}
          />
        </div>
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
          clicked={isUpdating ? handleUpdate : handleAdd}
        />
      </Modal>
      <Modal
        show={showArchiveModal}
        small
        modalClosed={(e) => {
          setShowArchiveModal(false);
        }}
      ></Modal>
      <Modal
        show={showDeleteModal}
        small
        modalClosed={(e) => {
          setShowDeleteModal(false);
        }}
      ></Modal>
      <Header />
      <div className="w-70% m-auto py-10">
        <SectionTitle name={t('List of all Carousels')} />
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto relative py-5">
            <div className="flex justify-between items-center">
              <div className="w-1/3 py-3">
                <Input
                  label="Search"
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
                name={t('Add new carousel')}
                isSquare
                outline="false"
                color="blue"
                clicked={() => {
                  setShowEditModal(true);
                  setIsUpdating(false);
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

export default CarouselAuthor;
