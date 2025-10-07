import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useMaterialStore } from '@/stores/useMaterial';
import type { Material } from '@/types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/editor/:id(\\d+)?',
      name: 'editor',
      component: () => import('../views/EditorView/Index.vue'),
      children: [
        {
          path: 'survey-type',
          name: 'survey-type',
          component: () => import('../views/EditorView/LeftSide/SurveyType.vue'),
        },
        {
          path: 'outline',
          name: 'outline',
          component: () => import('../views/EditorView/LeftSide/Outline.vue'),
        },
      ],
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('../views/MaterialsView/Index.vue'),
      redirect: '/select-group',
      children: [
        {
          path: '/select-group',
          name: 'select-group',
          component: () => import('../views/MaterialsView/SelectGroupView.vue'),
          redirect: '/single-select',
          children: [
            {
              path: '/single-select',
              name: 'single-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/multi-select',
              name: 'multi-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiSelect.vue'),
            },
            {
              path: '/option-select',
              name: 'option-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/OptionSelect.vue'),
            },
            {
              path: '/single-pic-select',
              name: 'single-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SinglePicSelect.vue'),
            },
            {
              path: '/multi-pic-select',
              name: 'multi-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiPicSelect.vue'),
            },
          ],
        },
        {
          path: '/input-group',
          name: 'input-group',
          component: () => import('../views/MaterialsView/InputGroupView.vue'),
        },
        {
          path: '/advanced-group',
          name: 'advanced-group',
          component: () => import('../views/MaterialsView/AdvancedGroupView.vue'),
        },
        {
          path: '/note-group',
          name: 'note-group',
          component: () => import('../views/MaterialsView/NoteGroupView.vue'),
          redirect: '/text-note',
          children: [
            {
              path: '/text-note',
              name: 'text-note',
              component: () => import('@/components/SurveyComs/Materials/NoteComs/TextNote.vue'),
            },
          ],
        },
        {
          path: '/personal-info-group',
          name: 'personal-info-group',
          component: () => import('../views/MaterialsView/PersonalInfoGroupView.vue'),
          redirect: '/personal-info-gender',
          children: [
            {
              path: '/personal-info-gender',
              name: 'personal-info-gender',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-education',
              name: 'personal-info-education',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
          ],
        },
        {
          path: '/contact-group',
          name: 'contact-group',
          component: () => import('../views/MaterialsView/ContactGroupView.vue'),
        },
      ],
    },
    {
      path: '/preview/:id(\\d+)',
      name: 'preview',
      component: () => import('../views/Preview.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const activeView = localStorage.getItem('activeView');
  const store = useMaterialStore();

  if (activeView === 'materials' && to.name) {
    const selectComponents = [
      'single-select',
      'multi-select',
      'option-select',
      'single-pic-select',
      'multi-pic-select',
      'text-note',
      'personal-info-gender',
      'personal-info-education',
    ];

    if (selectComponents.includes(to.name as Material)) {
      // 🔥 路由名称到组件数据的映射
      let comName = to.name;    
      store.setCurrentSurveyCom(comName as Material);
    } else {
      console.log('切换到其他模块:', to.name);
    }
  }
  next();
});
export default router;
