import { getChartByIdUsingGet, updateChartUsingPost } from '@/services/xingbi/chartController';
import { Button, Card, Col, Divider, Form, Input, message, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

/**
 * 图表页
 */
const chartDetail: React.FC = () => {
  const [chart, setChart] = useState<API.Chart>();
  const [editData, setEditData] = useState(null);
  //用于控制弹窗
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const GREEN_COLOR = 'green';

  const chartData = async () => {
    try {
      const res = await getChartByIdUsingGet({ id });
      if (res.data) {
        setChart(res.data);
      } else {
        message.error(res.message);
      }
    } catch (e: any) {
      message.error('获取图表详情失败,' + e.message);
    }
  };
  const EditModal = ({ visible, onCancel, onEdit, chart }) => {
    const [form] = Form.useForm();
    const handleOk = () => {
      form
        .validateFields()
        .then((values) => {
          // 处理修改逻辑，调用 onEdit 回调函数传递修改后的数据
          onEdit(values);
          form.resetFields();
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
        });
    };

    return (
      <Modal title="编辑图表" visible={visible} onCancel={onCancel} onOk={handleOk}>
        <Form form={form} initialValues={chart}>
          <Form.Item name="id" label="图表ID">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="chartName"
            label="图表名称"
            rules={[{ required: false, message: '请输入图表名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="genResult" label="分析结论" rules={[{ required: false }]}>
            <Input.TextArea rows={8} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  // 处理修改按钮点击事件
  const editChart = (data: any) => {
    setEditData(data);
    setIsModalVisible(true);
  };
  //处理确认修改按钮点击事件
  const handleEditConfirm = async (editedData: API.ChartUpdateRequest) => {
    try {
      const res = await updateChartUsingPost(editedData);
      if (res.data) {
        message.success('修改成功');
        chartData();
      } else {
        message.error(res.message);
      }
    } catch (e: any) {
      message.error('修改失败：' + e.message);
    }
    setIsModalVisible(false);
  };

  // 处理取消按钮点击事件
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  //首次加载页面或查询参数变化时，重新加载chartData()
  useEffect(() => {
    chartData();
  }, []);
  return (
    <div className="chartDetail">
      <Button style={{ marginLeft: '5px' }} type={'primary'} size={'small'} onClick={handleGoBack}>
        返回
      </Button>
      <Row gutter={24}>
        <Col span={12}>
          <Divider style={{ color: GREEN_COLOR }}>原始数据</Divider>
          <Card>
            <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
              <p style={{ fontWeight: 'bold', color: '#99664d', textAlign: 'center' }}>
                {chart?.chartData}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Divider style={{ color: GREEN_COLOR }}>图表信息</Divider>
          <Card style={{ color: 'black' }}>
            <Col>分析目标：{chart?.goal}</Col>
            <Col>图表类型：{chart?.chartType}</Col>
            <Col>图表名称：{chart?.chartName}</Col>
            <Col>分析时间：{new Date(chart?.createTime).toLocaleString('zh-CN')}</Col>
          </Card>
          <Divider style={{ color: GREEN_COLOR }}>分析结论</Divider>
          <Card>
            <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
              <p style={{ fontWeight: 'bold', color: '#99664d', textAlign: 'left' }}>
                {chart?.genResult}
              </p>
              <Button type={'primary'} size={'small'} onClick={() => editChart(chart)}>
                编辑图表
              </Button>
              <EditModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onEdit={handleEditConfirm}
                chart={editData}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default chartDetail;
