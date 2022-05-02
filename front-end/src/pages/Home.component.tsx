import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import HomeAPI from '../api/HomeApi';
import DoughnutChart from '../components/doughnut-chart.component';
import Loading from '../components/loading.component';
import MenuCmp from '../components/menu.component';

const listMenu = [
  {
    name: 'Create a new Set',
    link: '/create_set',
  },
];

const Home = () => {
  const focusRef: any = useRef(null);
  const [keySearch, setKeySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [listSets, setListSets] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(false);
  // let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    try {
      const _fetch = async () => {
        const data = await HomeAPI.getListSets('');
        setListSets(data);
        setLoading(false);
      };
      _fetch();
    } catch (error) {}
  }, []);

  const handleSearch = _.debounce((value: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      HomeAPI.getListSets(value).then((data: any) => {
        setListSets(data);
        setLoading(false);
      });
      focusRef.current.blur();
    }, 500);
  }, 500);

  return (
    <div className="homeCmp">
      {loading && <Loading />}

      <MenuCmp
        listMenu={listMenu}
        toggleMenu={toggleMenu}
        closeMenu={() => setToggleMenu(false)}
      />

      <div className="homeCmp_control">
        <input
          placeholder="Search..."
          value={keySearch}
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleSearch(e.target.value);
            }
          }}
          ref={focusRef}
        />
        <i
          className="bi bi-sliders"
          onClick={() => {
            setToggleMenu(!toggleMenu);
          }}
        ></i>
      </div>

      <div className="homeCmp_listItems">
        {listSets.map((set: any, index: any) => {
          return (
            <div
              key={set.id}
              data-toggle="tooltip"
              data-placement="top"
              title={set.description}
            >
              <div className="homeCmp_listItems_item">
                <p>
                  {index + 1}. {set.name}
                </p>
                <div className="homeCmp_listItems_item_process">
                  <DoughnutChart
                    process={[
                      set.cards.reduce(
                        (prev: any | number, next: { process: number }) => {
                          return prev + (next.process < 8 ? 1 : 0);
                        },
                        0
                      ),
                      set.cards.reduce(
                        (prev: any | number, next: { process: number }) => {
                          return (
                            prev + (next.process >= 8 && next.process < 13 ? 1 : 0)
                          );
                        },
                        0
                      ),
                      set.cards.reduce(
                        (prev: any | number, next: { process: number }) => {
                          return (
                            prev + (next.process >= 13 && next.process < 21 ? 1 : 0)
                          );
                        },
                        0
                      ),
                      set.cards.reduce(
                        (prev: any | number, next: { process: number }) => {
                          return prev + (next.process >= 21 ? 1 : 0);
                        },
                        0
                      ),
                    ]}
                  />
                  <div className="homeCmp_listItems_item_process_total">
                    {set.cards.reduce((prev: number, next: any) => {
                      return prev + 1;
                    }, 0) !== 0
                      ? set.cards.reduce((prev: number, next: any) => {
                          return prev + 1;
                        }, 0)
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
