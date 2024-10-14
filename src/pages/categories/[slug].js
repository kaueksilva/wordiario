import { getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import HeaderSlug from 'components/HeaderSlug';
import TemplateArchive from 'templates/archive';
import Title from 'components/Title';
import { getAllCategories } from 'lib/categories';

export default function Category({ category, posts }) {
  const { name, description, slug } = category;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description: description || category.og?.description || `Read ${posts.length} posts from ${name}`,
    },
  });

  return (
    <>
      {/* Adicionando o header aqui */}
      <HeaderSlug>
        <div className="w-full">
          <div>
            <div className="mapas border-t border-[#FFC719] bg-[#003470]">
              <h1 className="Montserrat-SemiBold text-white font-montserrat font-semibold text-4xl flex justify-center p-3 mt-28 z-10">
                {name} {/* Usando a variável name diretamente */}
              </h1>
            </div>

            {/* DIVISOR DE FORMA */}
            <div className="relative w-full">
              <svg width="100%" viewBox="0 0 2000 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.33"
                  d="M946 62.22C538.2 152.254 419.8 27.5523 305.4 62.22C132 115.037 0 54.4708 0 54.4708V-6.40161H2000V54.4708C2000 54.4708 1875.8 81.0833 1810.2 84.3462C1744.6 87.711 1684.6 71.8046 1658.6 61.8122C1612 44.1724 1490.6 2.46924 1389.8 -1.60931C1289 -5.68786 984.8 53.757 946 62.22Z"
                  fill="#003470"
                />
                <path
                  opacity="0.66"
                  d="M1468 62.22C1377 62.22 1313.6 38.5644 1209.8 22.3522C1152.6 13.4813 909.2 12.0538 701.8 62.22C494.4 112.386 518.4 27.1445 403.4 62.22C231.4 114.222 0 34.18 0 34.18V-6.40161H2000V30.8152C2000 30.8152 1943.6 11.9519 1815.8 11.9519C1620.4 12.0538 1551.4 62.22 1468 62.22Z"
                  fill="#003470"
                />
                <path
                  d="M1532.2 23.0659C1132.2 -35.5633 1000.2 89.8522 742 42.9489C484 -4.56626 484 -0.895566 369.6 14.6029C256 30.1014 264.6 39.3801 179.8 47.1294C57.2 58.5493 0 -6.40161 0 -6.40161H2000C2000 -6.40161 1980.2 35.3016 1832.8 42.643C1685.4 49.9844 1659.2 41.5214 1532.2 23.0659Z"
                  fill="#003470"
                />
              </svg>
            </div>
          </div>
        </div>
      </HeaderSlug>

      {/* Conteúdo principal */}
      <TemplateArchive title={name} Title={<Title title={name} />} posts={posts} slug={slug} metadata={metadata} />
    </>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { category } = await getCategoryBySlug(params?.slug);

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByCategoryId({
    categoryId: category.databaseId,
    queryIncludes: 'archive',
  });

  return {
    props: {
      category,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategories();
  const paths = categories.map((category) => {
    const { slug } = category;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
