import type { PropType } from 'vue';
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed } from 'vue';
import Iconify from '@purge-icons/generated';
import { isString } from '/@/utils/is';
import './index.less';
export default defineComponent({
  name: 'GIcon',
  props: {
    // icon name
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    // icon color
    color: {
      type: String as PropType<string>,
    },
    // icon size
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 14,
    },
    prefix: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { attrs }) {
    const elRef = ref<Nullable<HTMLElement>>(null);

    const getIconRef = computed(() => {
      const { icon, prefix } = props;
      return `${prefix ? prefix + ':' : ''}${icon}`;
    });
    const update = async () => {
      const el = unref(elRef);
      if (el) {
        await nextTick();
        const icon = unref(getIconRef);

        const svg = Iconify.renderSVG(icon, {});

        if (svg) {
          el.textContent = '';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      }
    };

    watch(() => props.icon, update, { flush: 'post' });

    const wrapStyleRef = computed((): any => {
      const { size, color } = props;
      let fs = size;
      if (isString(size)) {
        fs = parseInt(size, 10);
      }
      return {
        fontSize: `${fs}px`,
        color,
      };
    });

    onMounted(update);

    return () => (
      <div ref={elRef} class={[attrs.class, 'app-iconify']} style={unref(wrapStyleRef)} />
    );
  },
});
