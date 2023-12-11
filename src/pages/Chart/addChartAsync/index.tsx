import React, {useState} from 'react';
import {analysisByAsyncUsingPost, analysisBySynchronizeUsingPost} from '@/services/xingbi/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, message, Select, Space, Upload} from 'antd';
import {useForm} from "antd/es/form/Form";

/**
 * 图表分析（异步）
 */
const addChartAsync: React.FC = () => {

  //ant design 用于处理表单
  const [form] = useForm();
  //提交中的状态，默认为未提交
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { TextArea } = Input;

  const onFinish = async (values: any) => {

    //避免重复提交
    if (submitting){
      return;
    }
    setSubmitting(true)

    //此处先解构，拿到需要的参数
    const params = {
      ...values,
      file:undefined
    }
    try {
      const res = await analysisByAsyncUsingPost(params,{},values.file.file.originFileObj);
      if(!res?.data){
        message.error("分析失败:"+res.message)
      }else{
        message.success("分析成功，稍后可在我的图表页面中查看")
        //分析成功后，清空表单
        form.resetFields();
      }
    } catch (e:any){
      message.error('分析失败'+e.message)
    }
    //结束后设为false
    setSubmitting(false);
  };
  const formItemLayout = {
    labelAlign:"left",
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="add-chart-async">
          <Card title={"智能分析"}>
          <Form
            form={form}
            name="add-chart"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              'input-number': 3,
              'checkbox-group': ['A', 'B'],
              rate: 3.5,
              'color-picker': null,
            }}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="分析目标" name={'goal'} rules={[{ required: true }]}>
              <TextArea placeholder={'请输入你的分析诉求,例如：分析商品的销售情况'} rows={4} />
            </Form.Item>

            <Form.Item label="图表名称" name="chartName" rules={[{ required: true }]}>
              <Input placeholder={'请输入你的图表名称'} />
            </Form.Item>

            <Form.Item name="chartType" label="图表类型">
              <Select
                options={[
                  { value: '折线图', label: '折线图' },
                  { value: '柱状图', label: '柱状图' },
                  { value: '散点图', label: '散点图' },
                  { value: '饼图', label: '饼图' },
                  { value: '堆叠图', label: '堆叠图' },
                  { value: '雷达图', label: '雷达图' },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item
              name="file"
              label="原始Excel数据"
              rules={[{ required: true, message: '请上传文件' }]}
            >
              <Upload name="file" maxCount={1} accept={".xls,.xlsx"}>
                <Button icon={<UploadOutlined />}>上传excel文件</Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="Submit" loading={submitting} disabled={submitting}>
                  提交
                </Button>
                <Button htmlType="reset">重置</Button>
              </Space>
            </Form.Item>
          </Form>
          </Card>
    </div>
  );
};
export default addChartAsync;
