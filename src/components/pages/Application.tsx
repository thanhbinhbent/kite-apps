import React, { useEffect, useState } from "react";
import { getMicroAppMetaData } from "../../../module-app.config";
import { Card, Col, Row, Typography, Skeleton, Alert, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

export interface MicroAppMetaData {
  id: string;
  category: string;
  name: string;
  logo: string;
  description: string;
  author: {
    name: string;
    email: string;
  }[];
}

export type CategorizedApps = Record<string, MicroAppMetaData[]>;

const Application: React.FC = () => {
  const [categorizedApps, setCategorizedApps] = useState<CategorizedApps>(
    {} as CategorizedApps
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps(): Promise<void> {
      try {
        const apps = await getMicroAppMetaData();
        console.log("Fetched micro apps:", apps);

        if (!Array.isArray(apps)) {
          throw new Error("Dữ liệu nhận được không phải là mảng");
        }

        const categorized: CategorizedApps = {};
        apps.forEach((app: MicroAppMetaData) => {
          if (!categorized[app.category]) {
            categorized[app.category] = [];
          }
          categorized[app.category].push(app);
        });

        setCategorizedApps(categorized);
      } catch (err) {
        setError("Không thể tải danh sách ứng dụng.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  if (loading)
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <Row gutter={[16, 16]}>
          {new Array(8).fill(null).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card style={{ width: 260 }}>
                <Skeleton active avatar paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );

  if (error)
    return (
      <Alert
        className="p-8 text-center"
        message={error}
        type="error"
        showIcon
      />
    );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {Object.entries(categorizedApps).map(([section, items]) => (
        <div key={section} className="mb-8">
          <Title level={2} className="pb-2 mb-2">
            {section}
          </Title>
          <Row gutter={[16, 16]}>
            {items.map((app: MicroAppMetaData) => (
              <Col key={app.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  style={{
                    width: 260,
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => window.location.assign(app.id)}
                >
                  <Popover
                    content={
                      <div>
                        <div>{app.description}</div>
                        <div style={{ marginTop: 4, fontSize: 12 }}>
                          Tác giả: {app.author.map((a) => a.name).join(", ")}
                        </div>
                      </div>
                    }
                    title="Chi tiết ứng dụng"
                    trigger="hover"
                  >
                    <InfoCircleOutlined
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: 16,
                        color: "gray",
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    />
                  </Popover>
                  <Card.Meta
                    avatar={
                      <img
                        src={app.logo}
                        alt={app.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "contain",
                        }}
                      />
                    }
                    title={app.name}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Application;
