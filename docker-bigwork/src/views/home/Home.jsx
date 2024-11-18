import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Button,
  Drawer,
  FloatButton,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import "./Home.css";
import { PlusOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import { getMemberDataAPI } from "../../apis/home";
import { baseURL } from "../../utils/request";
import { addUserAPI, deleteUserAPI, updateUserAPI } from "../../apis/user";
const { confirm } = Modal;



const Home = () => {
  const [people, setPeople] = useState([]);

  // 获取成员数据
  useEffect(() => {
    getMemberDataAPI().then((res) => {
      setPeople(res.data);
    });
  }, []);

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddMember = (values) => {
    console.log("新增成员:", values);
    setAddModalOpen(false);
    form.resetFields();
  };

  const DrawerTitle = (
    <>

      <div className="flex flex-row items-center justify-between">
        <h4>编辑成员信息</h4>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalOpen(true)}
          >
            新增成员
          </Button>
        </Space>
      </div>
    </>
  );

  // 添加编辑相关状态
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editForm] = Form.useForm();

  // 添加处理编辑的函数
  const handleEdit = (record) => {
    setEditingMember(record);
    editForm.setFieldsValue({
      id: record.id,
      name: record.name,
      studentId: record.studentId,
      gender: record.gender,
      email: record.email,
      avatar: record.avatar,
      password: record.password,
      age: record.age,
      grade: record.grade,
      college: record.college,
      major: record.major
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = (values) => {
    console.log("修改成员:", values);
    setEditModalOpen(false);
    editForm.resetFields();
  };


  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "学号",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (gender === 1 ? "男" : "女"),
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "学院",
      dataIndex: "college",
      key: "college",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>修改</Button>
          <Button type="link" danger onClick={() => confirm({
            title: "确定要删除吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              deleteUserAPI(record.id).then((res) => {
                console.log(res);
                if (res.code === 200) {
                  message.success("删除成功");
                  getMemberDataAPI().then((res) => {
                    setPeople(res.data);
                  });
                } else {
                  message.error("删除失败");
                }
              });
            },
          })}>删除</Button>
        </Space>
      ),
    },
  ];

  // 更新通用的输入框样式
  const inputStyle = {
    width: '100%',
    height: '32px',
    borderRadius: '6px' // 添加圆角样式
  };

  return (
    <>

      {/* 新增成员弹窗 */}
      <Modal
        title="新增成员"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            addUserAPI(values).then((res) => {
              console.log(res);
              if (res.code === 200) {
                message.success("新增成功");
                getMemberDataAPI().then((res) => {
                  setPeople(res.data);
                });
              } else {
                message.error("新增失败");
              }
              setAddModalOpen(false);
              form.resetFields();

            });
          });
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleAddMember}
        >
          <Form.Item
            name="studentId"
            label="学号"
            rules={[{ required: true, message: "请输入学号" }]}
          >
            <Input placeholder="请输入学号" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="请输入年龄"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Select placeholder="请选择性别" style={inputStyle}>
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={0}>女</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="college"
            label="学院"
            rules={[{ required: true, message: "请输入学院" }]}
          >
            <Input placeholder="请输入学院" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="major"
            label="专业"
            rules={[{ required: true, message: "请输入专业" }]}
          >
            <Input placeholder="请输入专业" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <InputNumber
              min={2000}
              max={2100}
              placeholder="请输入年级"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input placeholder="请输入邮箱" style={inputStyle} />
          </Form.Item>
        </Form>
      </Modal>
      {/* 编辑成员弹窗 */}
      <Drawer
        width={1000}
        title={DrawerTitle}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Table rowKey="id" columns={columns} dataSource={people} >
          <Table.Column title="性别" key="gender" render={(_, record) => (
            record.gender === 1 ? "男" : "女"
          )} />
        </Table>
      </Drawer>
      {/* 编辑成员浮动按钮 */}
      <FloatButton onClick={() => setDrawerOpen(true)} />
      {/* 成员信息弹窗 */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          onClick={() => setOpen(false)}
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed h-[80vh]  inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative h-[80%] transform overflow-x-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-full">
                <div className="sm:flex sm:items-start h-full">
                  <video
                    src="/nailong.mp4"
                    autoPlay
                    controls
                    className="w-full h-full"
                  ></video>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Deactivate
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* rrr */}
      <div className=" w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className=" py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">

              <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                我们的成员
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                我们是一个充满朝气的团队，对大作业充满热情，致力于完成一个优秀的项目。
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people && people.map((person) => (
                <li key={person.id}>
                  <div className="hover:cursor-pointer flex items-center gap-x-6 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <img
                      onClick={() => setOpen(true)}
                      alt=""
                      src={baseURL + person.avatar || "/avator.png"}
                      className="h-20 w-20 rounded-full border-4 border-indigo-200 cursor-pointer hover:scale-110 hover:border-indigo-400 transition-all duration-300 shadow-lg"
                    />
                    <div className="collapse bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <input
                        type="checkbox"
                        className="w-full"
                        defaultChecked={true}
                      />
                      <div className="collapse-title text-xl font-medium p-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                            {person.name}
                          </h3>
                          <div className="badge badge-lg badge-primary badge-outline hover:text-indigo-600 transition-colors duration-300">
                            {person.college + " " + person.major + " " + person.grade}
                          </div>
                          <p className="text-base font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                            {person.studentId}
                          </p>
                        </div>
                      </div>
                      <div className="collapse-content p-4 space-y-3">
                        <div className="badge badge-lg badge-primary badge-outline hover:text-indigo-600 transition-colors duration-300">
                          {person.age}岁
                        </div>
                        <div className="badge badge-lg badge-primary badge-outline hover:text-indigo-600 transition-colors duration-300">
                          {person.gender === 1 ? "男" : "女"}
                        </div>
                        <div className="badge badge-lg badge-primary badge-outline hover:text-indigo-600 transition-colors duration-300">
                          {person.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
      {/* 添加编辑成员的 Modal */}
      <Modal
        title="编辑成员"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={() => {
          editForm.validateFields().then((values) => {
            updateUserAPI(values).then((res) => {
              console.log(res);
              if (res.code === 200) {
                message.success("修改成功");
                getMemberDataAPI().then((res) => {
                  setPeople(res.data);
                });
              } else {
                message.error("修改失败");
              }
              setEditModalOpen(false);
              editForm.resetFields();
            });
          });
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={editForm}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleEditSubmit}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="studentId"
            label="学号"
            rules={[{ required: true, message: "请输入学号" }]}
          >
            <Input placeholder="请输入学号" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="请输入年龄"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Select placeholder="请选择性别" style={inputStyle}>
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={0}>女</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="college"
            label="学院"
            rules={[{ required: true, message: "请输入学院" }]}
          >
            <Input placeholder="请输入学院" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="major"
            label="专业"
            rules={[{ required: true, message: "请输入专业" }]}
          >
            <Input placeholder="请输入专业" style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <InputNumber
              min={2000}
              max={2100}
              placeholder="请输入年级"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input placeholder="请输入邮箱" style={inputStyle} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Home;
