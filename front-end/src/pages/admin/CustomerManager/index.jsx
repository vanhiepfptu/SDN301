import { useState, useEffect } from "react";
import "./CustomerManager.scss";
import { useSelector } from "react-redux";
import axios from 'axios';

function CustomerManager() {
  const [userSearch, setUserSearch] = useState("")
  const [accountManage, setAccountManage] = useState([])
  const [totalAccount, setTotalAccount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("active")
  const [selectedAccount, setSelectedAccount] = useState()
  const [selectedReason, setSelectedReason] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [newUsersCount, setNewUsersCount] = useState(0)
  const account = useSelector(state => state.account)
  useEffect(() => {
    axios
      .get('/api/account/getAll', {
        headers: {
          Authorization: `Bearer ${account?.accessToken}`
        }
      })
      .then((res) => {
        const totalAccounts = res.data.totalAccount
        setTotalAccount(totalAccounts)
        setAccountManage(res.data.data)
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with an error:", error.response)
        } else if (error.request) {
          console.error("No response received:", error.request)
        } else {
          console.error("Request setup error:", error.message)
        }
        console.error("Error config:", error.config)
      });

  }, [accountManage]);

  useEffect(() => {
    const currentDate = new Date()
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(currentDate.getDate() - 2)

    const newUsers = accountManage.filter((user) => {
      const userCreatedAt = new Date(user.createdAt)
      return userCreatedAt >= twoDaysAgo && userCreatedAt <= currentDate
    })

    setNewUsersCount(newUsers.length)
  }, [accountManage])

  useEffect(() => {
    const activeUsers = accountManage.filter((user) => user.isActive)
    setActiveUsersCount(activeUsers.length)
  }, [accountManage])

  const resetFields = () => {
    setSelectedStatus("active")
    setSelectedAccount(null)
    setSelectedReason("")
    setSelectedDate("")
  }

  const handleChangeStatus = (accountId, newStatus) => {
    axios
      .put(`/api/account/${newStatus ? 'deActive' : 'inActive'}/${accountId}`, {
        deActiveReason: selectedReason,
        deActiveAt: selectedDate,
      }, {
        headers: {
          Authorization: `Bearer ${account?.accessToken}`
        },
      })
      .then((res) => {
        const updatedData = accountManage.map((account) => {
          if (account._id === accountId) {
            return { ...account, isActive: !newStatus, role: account.role }
          }
          return account
        });
        setAccountManage([...updatedData]);
        setOpenModal(false)
      })
      .catch((err) => {
        console.log(err)
      });

    resetFields()
  }

  const handleStatusChange = () => {
    if (selectedAccount && selectedAccount._id) {
      if (selectedStatus === "active") {
        handleChangeStatus(selectedAccount._id, false);
      } else if (selectedStatus === "deactive") {
        handleChangeStatus(selectedAccount._id, true);
      }
    }
  }

  const formattedAccounts = accountManage.map((a) => {
    const formattedDate = new Date(a.createdAt).toLocaleString()
    const formattedDeActiveAt = a.deActiveAt ? new Date(a.deActiveAt).toLocaleDateString() : "N/A"
    return {
      ...a,
      formattedDate,
      formattedDeActiveAt,
    };
  })

  const filteredAccounts = formattedAccounts.filter((a) =>
    a.username.toLowerCase().includes(userSearch.toLowerCase())
  )

  return (
    <div className="customerManager">
      <div className="portfolio">
        <div className="portfolioTitle">
          <span>Portfolio Performance</span>
        </div>
        <hr />
        <div className="portfolioBox">
          <div className="totalUsers">
            <h5 className="totalUsersTitle">Total Users</h5>
            <div className="totalUsersBox">
              <span>
                <b>{totalAccount}</b>
              </span>
            </div>
          </div>
          <div className="activeMembers">
            <h5 className="activeMembersTitle">Active Members</h5>
            <div className="activeMembersBox">
              <span>
                <b>{activeUsersCount}</b>
              </span>
            </div>
          </div>
          <div className="newUser">
            <h5 className="newUserTitle">New User</h5>
            <div className="newUserBox">
              <span>
                <b>{newUsersCount}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="listUsers">
        <div className="listUsersHeader">
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="inputSearchUser"
            placeholder="Search Users"
          />
        </div>
        <div className="tableUser">
          <div className="tableHeader">
            <div className="nameHeader">
              <span>Name</span>
            </div>
            <div className="addressHeader">
              <span>Status</span>
            </div>
            <div className="statusHeader">
              <span>Role</span>
            </div>
            <div className="roleHeader">
              <span>Created at</span>
            </div>
            <div className="roleHeader">
              <span>DeActive at</span>
            </div>
            <div className="roleHeader">
              <span>Reason</span>
            </div>
            <div className="handleBox"></div>
          </div>
          <div className={`overlay${openModal ? " show" : ""}`}></div>
          <div className="tableBody">
            {filteredAccounts.map((a) => (
              <div className="rowBody" key={a._id}>
                <div className="nameBody">
                  <span>{a.username}</span>
                </div>
                <div className="statusBody">
                  <span>{a.isActive ? "active" : "deactive"}</span>
                </div>
                <div className="roleBody">
                  <span>{a.role ? a.role.roleName : ""}</span>
                </div>
                <div className="addressBody">
                  <span>{a.formattedDate}</span>
                </div>
                <div className="addressBody">
                  <span>{a.formattedDeActiveAt}</span>
                </div>
                <div className="addressBody">
                  <span>{a.deActiveReason}</span>
                </div>
                <div className="handleBoxBody">
                  <button
                    onClick={() => {
                      setSelectedAccount(a);
                      setSelectedStatus(a.isActive ? "deactive" : "active");
                      setOpenModal(true);
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            ))}
          </div>
          {openModal && (
            <div className="modalBackground">
              <div className={`modalContainer${openModal ? " show" : ""}`}>
                <div className="titleCloseBtn">
                  <button
                    onClick={() => {
                      resetFields();
                      setOpenModal(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="title">
                  <h1>Change status</h1>
                </div>
                <div className="body">
                  <select
                    className="status"
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </select>
                  <input
                    className="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <textarea
                    className="reason"
                    type="text"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                </div>
                <div className="footer">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    id="cancelBtn"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusChange}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerManager;
