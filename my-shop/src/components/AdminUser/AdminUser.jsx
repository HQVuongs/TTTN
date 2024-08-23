import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../LoadingComponent/Loading";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../AdminUser/style";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { getBase64 } from "../../utils";
import * as message from "../../components/Message/Message";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user)

  const searchInput = useRef(null);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [form] = Form.useForm();


  const mutationUpdate = useMutationHooks((data) => {
    const {
      id,
      token,
      ...rests
    } = data;
    const res = UserService.updateUser(
      id,
      token,
    {...rests});
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const {
      id,
      token,
    } = data;
    const res = UserService.deleteUser(
      id,
      token
        );
    return res;
  });
  const getAllUsers = async () => {
    const res = await UserService.getAllUser();
    return res;
  };
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected)
    if(res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
      })
    }
    setIsPendingUpdate(false)
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])
  

  useEffect(() => {
    if(rowSelected) {
      setIsPendingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected])
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { isPending: isPendingUsers, data: users } = queryUser
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "blue", fontSize: "25px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };
  //tim kiem

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

 // ---
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name")
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a,b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email")
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: 'True',
          value: 'true',
        },
        {
          text: 'False',
          value: 'false',
        },
      ],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a,b) => a.phone - b.phone,
      ...getColumnSearchProps("phone")
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' };
    });
  
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (dataUpdated?.status === "ERR") {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (dataDeleted?.status === "ERR") {
      message.error();
    }
  }, [isSuccessDeleted]);
  
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteUser = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    })
    form.resetFields()

  }

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };

  const handleOnchangeImageDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      image: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails},{
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        <TableComponent
          columns={columns}
          isPending={isPendingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      {/* update user */}

      <DrawerComponent
        forceRender
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên !" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            {/* <Form.Item
              label="Ảnh"
              name="image"
              rules={[{ required: true, message: "Vui lòng thêm ảnh!" }]}
            >
              <WrapperUploadFile
                fileList={
                  stateUserDetails?.image
                    ? [{ url: stateUserDetails?.image }]
                    : []
                }
                onChange={handleOnchangeImageDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateUserDetails?.image && (
                  <img
                    src={stateUserDetails?.image}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="imageProduct"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item> */}

            <Form.Item
              wrapperCol={{ offset: 20, span: 16 }}
              style={{ marginBottom: "auto" }}
            >
              <Button type="primary" htmlType="submit">
                Sửa
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      {/* xoa user*/}

      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isPendingDeleted}>
          <div> Bạn có chắc xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
