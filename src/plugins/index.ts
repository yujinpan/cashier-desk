import { CMForm, CMFormControl } from '@greatmap/common-modules';
import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioButton,
  Table,
  TableColumn,
  Link,
  Dialog,
  Loading,
  RadioGroup,
  Tag,
} from 'element-ui';
import Vue from 'vue';
import './echarts';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Link);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Tag);

Vue.use(CMFormControl);
Vue.use(CMForm);
