"use strict";

import sequelize from "@config/sequelize";
import Users from "./User";
import UserDetails from "./UserDetail";
import GiftWell from "./GiftWell";
import Donation from "./Donation";
import Registries from "./Registry";
import RegistryItem from "./RegistryItem";
import Product from "./Product";
import { setupAssociations } from "./associations";
import Service from "./Service";
import ProductTypes from "./ProductType";
import SupportMessages from "./SupportMessages";
import PaymentDetail from "./PaymentDetail";
import RegistryServices from "./RegistryServices";
import Blog from "./Blog";
import BlogCategory from "./BlogCategory";
import Roles from "./Roles";
import Article from "./Article";
import CareGiver from "./CareGiver";

const models = {
  users: Users(sequelize),
  userDetails: UserDetails(sequelize),
  giftWell: GiftWell(sequelize),
  registries: Registries(sequelize),
  registryItem: RegistryItem(sequelize),
  product: Product(sequelize),
  donation: Donation(sequelize),
  productTypes: ProductTypes(sequelize),
  services: Service(sequelize),
  supportMessages: SupportMessages(sequelize),
  paymentDetail: PaymentDetail(sequelize),
  registryServices: RegistryServices(sequelize),
  blog: Blog(sequelize),
  blogCategory: BlogCategory(sequelize),
  roles: Roles(sequelize),
  article: Article(sequelize),
  careGiver: CareGiver(sequelize),
};

setupAssociations(models);
models.sequelize = sequelize;

export default models;
