import React from "react";
export const Nav00DataSource = {
  wrapper: { className: "header0 home-page-wrapper" },
  page: { className: "home-page" },
  logo: {
    className: "header0-logo",
    children: "https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"
  },
  Menu: {
    className: "header0-menu",
    children: [
      {
        name: "item0",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航一", name: "text" }]
        },
        subItem: [
          {
            name: "sub0",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                {
                  name: "image0",
                  className: "item-image",
                  children:
                    "https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg"
                },
                {
                  name: "title",
                  className: "item-title",
                  children: "Ant Design"
                },
                {
                  name: "content",
                  className: "item-content",
                  children: "企业级 UI 设计体系"
                }
              ]
            }
          },
          {
            name: "sub1",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                {
                  name: "image0",
                  className: "item-image",
                  children:
                    "https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg"
                },
                {
                  name: "title",
                  className: "item-title",
                  children: "Ant Design"
                },
                {
                  name: "content",
                  className: "item-content",
                  children: "企业级 UI 设计体系"
                }
              ]
            }
          }
        ]
      },
      {
        name: "item1",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航二", name: "text" }]
        }
      },
      {
        name: "item2",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航三", name: "text" }]
        }
      },
      {
        name: "item3",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航四", name: "text" }]
        }
      }
    ]
  },
  mobileMenu: { className: "header0-mobile-menu" }
};
export const Banner20DataSource = {
  wrapper: { className: "banner2" },
  BannerAnim: {
    children: [
      {
        name: "elem0",
        BannerElement: { className: "banner-user-elem" },
        page: { className: "home-page banner2-page" },
        textWrapper: { className: "banner2-text-wrapper" },
        bg: { className: "bg bg0" },
        title: { className: "banner2-title", children: "Ant Motion" },
        content: {
          className: "banner2-content",
          children: "一个高效的页面动画解决方案"
        },
        button: { className: "banner2-button", children: "Learn More" }
      }
    ]
  }
};
export const Content00DataSource = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "产品与服务" }]
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png"
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式业务接入"
            },
            { name: "content", children: "支付、结算、核算接入产品效率翻四倍" }
          ]
        }
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png"
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式事中风险监控"
            },
            {
              name: "content",
              children: "在所有需求配置环节事前风险控制和质量控制能力"
            }
          ]
        }
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png"
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式数据运营"
            },
            {
              name: "content",
              children: "沉淀产品接入效率和运营小二工作效率数据"
            }
          ]
        }
      }
    ]
  }
};
export const Feature80DataSource = {
  wrapper: { className: "home-page-wrapper feature8-wrapper" },
  page: { className: "home-page feature8" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "feature8-title-wrapper",
    children: [
      { name: "title", className: "feature8-title-h1", children: "使用流程" },
      {
        name: "content",
        className: "feature8-title-content",
        children: "流程简单清晰，快速响应需求"
      }
    ]
  },
  childWrapper: {
    className: "feature8-button-wrapper",
    children: [
      {
        name: "button",
        className: "feature8-button",
        children: { href: "#", children: "立即体验" }
      }
    ]
  },
  Carousel: {
    dots: false,
    className: "feature8-carousel",
    wrapper: { className: "feature8-block-wrapper" },
    children: {
      className: "feature8-block",
      titleWrapper: {
        className: "feature8-carousel-title-wrapper",
        title: { className: "feature8-carousel-title" }
      },
      children: [
        {
          name: "block0",
          className: "feature8-block-row",
          gutter: 120,
          title: {
            className: "feature8-carousel-title-block",
            children: "平台自主训练流程"
          },
          children: [
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child0",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children: "沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child1",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child2",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child3",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            }
          ]
        },
        {
          name: "block1",
          className: "feature8-block-row",
          gutter: 120,
          title: {
            children: "平台自主训练流程",
            className: "feature8-carousel-title-block"
          },
          children: [
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child0",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children: "沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child1",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child2",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            },
            {
              className: "feature8-block-col",
              md: 6,
              xs: 24,
              name: "child3",
              arrow: {
                className: "feature8-block-arrow",
                children:
                  "https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg"
              },
              children: {
                className: "feature8-block-child",
                children: [
                  {
                    name: "image",
                    className: "feature8-block-image",
                    children:
                      "https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg"
                  },
                  {
                    name: "title",
                    className: "feature8-block-title",
                    children: "需求沟通"
                  },
                  {
                    name: "content",
                    className: "feature8-block-content",
                    children:
                      "沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }
};
export const Footer10DataSource = {
  wrapper: { className: "home-page-wrapper footer1-wrapper" },
  OverPack: { className: "footer1", playScale: 0.2 },
  block: {
    className: "home-page",
    gutter: 0,
    children: [
      {
        name: "block0",
        xs: 24,
        md: 6,
        className: "block",
        title: {
          className: "logo",
          children:
            "https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg"
        },
        childWrapper: {
          className: "slogan",
          children: [
            {
              name: "content0",
              children: "Animation specification and components of Ant Design."
            }
          ]
        }
      },
      {
        name: "block1",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "产品" },
        childWrapper: {
          children: [
            { name: "link0", href: "#", children: "产品更新记录" },
            { name: "link1", href: "#", children: "API文档" },
            { name: "link2", href: "#", children: "快速入门" },
            { name: "link3", href: "#", children: "参考指南" }
          ]
        }
      },
      {
        name: "block2",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "关于" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "FAQ" },
            { href: "#", name: "link1", children: "联系我们" }
          ]
        }
      },
      {
        name: "block3",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "资源" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "Ant Design" },
            { href: "#", name: "link1", children: "Ant Motion" }
          ]
        }
      }
    ]
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        ©2018 by <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved
      </span>
    )
  }
};
export const Footer00DataSource = {
  wrapper: { className: "home-page-wrapper footer0-wrapper" },
  OverPack: { className: "home-page footer0", playScale: 0.05 },
  copyright: {
    className: "copyright",
    children: (
      <span>
        ©2018 <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved
      </span>
    )
  }
};
