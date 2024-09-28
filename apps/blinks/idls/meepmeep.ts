export type Meepmeep = {
  version: '0.1.0'
  name: 'meepmeep'
  instructions: [
    {
      name: 'createBoss'
      accounts: [
        {
          name: 'boss'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'bossId'
          type: 'u64'
        },
        {
          name: 'health'
          type: 'u64'
        },
      ]
    },
    {
      name: 'dealDamage'
      accounts: [
        {
          name: 'boss'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'damage'
          type: 'u64'
        },
      ]
    },
    {
      name: 'withdraw'
      accounts: [
        {
          name: 'boss'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
        {
          name: 'recipient'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'boss'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bossId'
            type: 'u64'
          },
          {
            name: 'health'
            type: 'u64'
          },
          {
            name: 'isDefeated'
            type: 'bool'
          },
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'players'
            type: {
              vec: {
                defined: 'PlayerInfo'
              }
            }
          },
          {
            name: 'owner'
            type: 'publicKey'
          },
        ]
      }
    },
  ]
  types: [
    {
      name: 'PlayerInfo'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'address'
            type: 'publicKey'
          },
          {
            name: 'damage'
            type: 'u64'
          },
          {
            name: 'count'
            type: 'u64'
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: 'BossAlreadyDefeated'
      msg: 'Boss is already defeated'
    },
    {
      code: 6001
      name: 'InsufficientFunds'
      msg: 'Insufficient funds'
    },
    {
      code: 6002
      name: 'NotTheOwner'
      msg: 'Not the owner'
    },
  ]
}

export const IDL: Meepmeep = {
  version: '0.1.0',
  name: 'meepmeep',
  instructions: [
    {
      name: 'createBoss',
      accounts: [
        {
          name: 'boss',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bossId',
          type: 'u64',
        },
        {
          name: 'health',
          type: 'u64',
        },
      ],
    },
    {
      name: 'dealDamage',
      accounts: [
        {
          name: 'boss',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'damage',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdraw',
      accounts: [
        {
          name: 'boss',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'recipient',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'boss',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bossId',
            type: 'u64',
          },
          {
            name: 'health',
            type: 'u64',
          },
          {
            name: 'isDefeated',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'players',
            type: {
              vec: {
                defined: 'PlayerInfo',
              },
            },
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'PlayerInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'address',
            type: 'publicKey',
          },
          {
            name: 'damage',
            type: 'u64',
          },
          {
            name: 'count',
            type: 'u64',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'BossAlreadyDefeated',
      msg: 'Boss is already defeated',
    },
    {
      code: 6001,
      name: 'InsufficientFunds',
      msg: 'Insufficient funds',
    },
    {
      code: 6002,
      name: 'NotTheOwner',
      msg: 'Not the owner',
    },
  ],
}
