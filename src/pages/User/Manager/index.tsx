import { checkInUsingPost, getUserByIdUsingGet } from '@/services/xingbi/scoreController';
import { uploadUsingPost } from '@/services/xingbi/tongyongjiekou';
import { getLoginUserUsingGet, updateMyUserUsingPost } from '@/services/xingbi/userController';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isSignedIn, setSignedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<API.BaseResponseLoginUserVO_>();
  const [score, setScore] = useState<API.BaseResponseLong_>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const fetchData = async () => {
    try {
      const [userRes, scoreRes] = await Promise.all([
        getLoginUserUsingGet(),
        getUserByIdUsingGet(),
      ]);

      if (userRes.data) {
        setUserData(userRes);
      } else {
        message.error(userRes.message);
      }

      if (scoreRes.data) {
        setScore(scoreRes);
      } else {
        message.error(scoreRes.message);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 签到逻辑
   */
  const handleSignIn = async () => {
    const res = await checkInUsingPost();
    if (res.data === '签到成功') {
      setSignedIn(true);
      fetchData();
      message.success(res.data);
    } else {
      message.error(res.message);
      setSignedIn(false);
    }
  };

  const handleRecharge = () => {
    message.info('跳转到充值积分页面');
  };

  const handleEditProfile = () => {
    setModalVisible(true);
    form.setFieldsValue({ userName: userData?.data?.userName });
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUserInfo: API.UserUpdateMyRequest = {
        userAvatar: avatarUrl,
        userName: form.getFieldValue('userName'),
      };
      const updateUserInfo = await updateMyUserUsingPost(updatedUserInfo);

      if (updateUserInfo.data) {
        message.success('保存成功！');
        fetchData(); // 获取最新的用户信息和积分
        setModalVisible(false);
      } else {
        message.error(updateUserInfo.message);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * 头像上传到阿里云对象存储服务中，返回对应的url地址
   * @param info
   */
  const handleAvatarChange = async (info) => {
    try {
      const res = await uploadUsingPost(info);
      if (res.data) {
        setAvatarUrl(res.data);
        // 更新头像的显示
        // 使用 setUserData 更新用户数据，确保 Avatar 组件能够及时获取最新的头像 URL
        // setUserData((userData) => ({
        //     ...userData,
        //     data: {
        //         ...userData?.data,
        //         userAvatar: res.data,
        //     },
        // }));
      }
    } catch (error) {
      console.error('Error in handleAvatarChange:', error);
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100vh',
        paddingLeft: '20px',
        paddingTop: '20px',
      }}
    >
      <Card style={{ width: 400, textAlign: 'center', padding: 20 }}>
        <Avatar size={80} src={userData?.data?.userAvatar} />
        <h2 style={{ fontSize: 24 }}>{userData?.data?.userName}</h2>
        <p style={{ fontSize: 18 }}>积分：{score?.data}</p>
        <Button
          type="primary"
          size="large"
          onClick={handleSignIn}
          disabled={isSignedIn}
          style={{ fontSize: 18 }}
        >
          {isSignedIn ? '已签到' : '签到'}
        </Button>

        <Button style={{ marginTop: 10, fontSize: 18 }} size="large" onClick={handleRecharge}>
          充值积分
        </Button>
        <Button style={{ marginTop: 10, fontSize: 18 }} size="large" onClick={handleEditProfile}>
          编辑个人信息
        </Button>
      </Card>

      <Modal
        title="编辑个人信息"
        visible={isModalVisible}
        onOk={handleSaveProfile}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="昵称" name="userName">
            <Input />
          </Form.Item>
          <Form.Item label="头像">
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
              {userData?.data?.userAvatar ? (
                <Avatar size={40} src={avatarUrl ? avatarUrl : userData?.data?.userAvatar} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

  // return (
  //     <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', height: '100vh', padding: '20px' }}>
  //         <Card style={{ width: '100%', textAlign: 'center', padding: 20 }}>
  //             {/* 用户信息和操作按钮 */}
  //             <Avatar size={80} src={userData?.data?.userAvatar} icon={<UserOutlined />} />
  //             <h2 style={{ fontSize: '24px' }}>{userData?.data?.userName}</h2>
  //             <p style={{ fontSize: '18px' }}>积分：{score?.data}</p>
  //             <Button type="primary" size="large" onClick={handleSignIn} disabled={isSignedIn} style={{ fontSize: '18px' }}>
  //                 {isSignedIn ? '已签到' : '签到'}
  //             </Button>
  //             {/* 更多按钮 */}
  //         </Card>
  //
  //         {/* 右侧内容，如果需要在这里添加 */}
  //
  //         <Modal
  //             title="编辑个人信息"
  //             visible={isModalVisible}
  //             onOk={handleSaveProfile}
  //             onCancel={() => setModalVisible(false)}
  //         >
  //             <Form form={form} layout="vertical">
  //                 {/* 表单内容 */}
  //             </Form>
  //         </Modal>
  //     </div>
  // );
};

export default UserProfile;
