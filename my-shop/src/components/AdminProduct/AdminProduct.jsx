import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/userMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, settStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });

  const mutation = useMutationHooks((data) => {
    const { name, price, description, rating, image, type, countInStock: countInStock } =
      data;
    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock
  });
  return res
  });
  const { data, isPending, isSuccess, isError} = mutation;
  useEffect(() => {

    if(isSuccess && data?.status === "OK") {
        message.success()
        handleCancel()
    } else if(data?.status === "ERR"){
        message.error()
    }
  },[isSuccess])
  const handleCancel = () => {
    setIsModalOpen(false);
    settStateProduct({
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
        type: "",
        countInStock: "",
    })
  };
  const onFinish = () => {
    mutation.mutate(stateProduct);
  };
  const handleOnchange = (e) => {
    settStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    settStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="Name"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="Type"
              rules={[{ required: true, message: "Vui lòng nhập loại!" }]}
            >
              <InputComponent
                value={stateProduct.type}
                onChange={handleOnchange}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="countInStock"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Chất lượng"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đánh giá chất lượng!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="image"
              rules={[{ required: true, message: "Vui lòng thêm ảnh!" }]}
            >
              <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1}>
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
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
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminUser;
